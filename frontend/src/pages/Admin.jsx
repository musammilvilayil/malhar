import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Trash2, LogOut, Plus, UploadCloud, X, Image as ImageIcon, GripVertical, Pencil } from "lucide-react";
import { api, BACKEND_URL, setToken, clearToken, getToken } from "../lib/api";

const KINDS = ["news", "events", "gallery"];
const EMPTY = { title: "", summary: "", body: "", image_url: "", date: "", location: "", published: true };

const ImageUpload = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please choose an image file"); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/admin/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      onChange(`${BACKEND_URL}${data.url}`);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed");
    }
    setUploading(false);
  };

  const onDrop = (e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files?.[0]); };

  return (
    <div>
      {value ? (
        <div className="relative border border-charcoal/15 group" data-testid="admin-image-preview">
          <img src={value} alt="Selected" className="w-full h-44 object-cover" />
          <button type="button" onClick={() => onChange("")} className="absolute top-2 right-2 bg-charcoal/80 text-cream p-1.5 hover:bg-red-600" data-testid="admin-image-remove" aria-label="Remove image"><X size={16} /></button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={`cursor-pointer border-2 border-dashed p-6 text-center transition-colors ${drag ? "border-emerald bg-emerald/5" : "border-charcoal/20 hover:border-emerald/50"}`}
          data-testid="admin-image-dropzone"
        >
          {uploading ? (
            <p className="text-charcoal/60 text-sm flex items-center justify-center gap-2"><UploadCloud size={18} className="animate-pulse" /> Uploading…</p>
          ) : (
            <>
              <UploadCloud size={26} className="mx-auto text-emerald" />
              <p className="mt-2 text-sm text-charcoal/70">Drag & drop an image, or <span className="text-emerald underline">browse</span></p>
              <p className="text-xs text-charcoal/40 mt-1">JPG, PNG, GIF or WEBP · up to 10MB</p>
            </>
          )}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files?.[0])} data-testid="admin-image-input" />
      <input placeholder="…or paste an image URL" value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-charcoal/15 px-3 py-2.5 mt-2 text-sm outline-none focus:border-emerald bg-transparent" data-testid="admin-field-image" />
    </div>
  );
};

const MultiUpload = ({ onDone }) => {
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState("");
  const ref = useRef(null);

  const handle = async (fileList) => {
    const files = [...fileList].filter((f) => f.type.startsWith("image/"));
    if (!files.length) { toast.error("Please choose image files"); return; }
    setBusy(true);
    try {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        setProgress(`Uploading ${i + 1} of ${files.length}…`);
        const fd = new FormData();
        fd.append("file", files[i]);
        const { data } = await api.post("/admin/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
        urls.push(`${BACKEND_URL}${data.url}`);
      }
      await api.post("/admin/gallery/bulk", { items: urls.map((u) => ({ image_url: u, title: "Gallery photo" })) });
      toast.success(`${urls.length} photo${urls.length > 1 ? "s" : ""} added`);
      onDone();
    } catch (e) { toast.error(e?.response?.data?.detail || "Upload failed"); }
    setBusy(false); setProgress("");
  };

  const onDrop = (e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files); };

  return (
    <div
      onClick={() => !busy && ref.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      className={`cursor-pointer border-2 border-dashed p-10 text-center transition-colors ${drag ? "border-emerald bg-emerald/5" : "border-charcoal/20 hover:border-emerald/50"}`}
      data-testid="gallery-multi-dropzone"
    >
      <UploadCloud size={30} className={`mx-auto text-emerald ${busy ? "animate-pulse" : ""}`} />
      <p className="mt-3 text-charcoal/70">{busy ? progress : <>Drag & drop <strong>multiple photos</strong>, or <span className="text-emerald underline">browse</span></>}</p>
      <p className="text-xs text-charcoal/40 mt-1">They'll be published to the gallery in one go · JPG/PNG/GIF/WEBP</p>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handle(e.target.files)} data-testid="gallery-multi-input" />
    </div>
  );
};

const GalleryManager = ({ items, reload }) => {
  const [order, setOrder] = useState(items);
  const dragId = useRef(null);
  useEffect(() => { setOrder(items); }, [items]);

  const persistOrder = async (list) => {
    setOrder(list);
    try { await api.put("/admin/gallery/reorder", { ids: list.map((i) => i.id) }); }
    catch { toast.error("Could not save order"); }
  };

  const onDrop = (targetId) => {
    const from = order.findIndex((i) => i.id === dragId.current);
    const to = order.findIndex((i) => i.id === targetId);
    if (from === -1 || to === -1 || from === to) return;
    const list = [...order];
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    persistOrder(list);
  };

  const saveCaption = async (it, caption) => {
    if ((it.title || "") === caption) return;
    try {
      await api.put(`/admin/content/gallery/${it.id}`, { title: caption || "Gallery photo", summary: it.summary || "", image_url: it.image_url, order: it.order, published: true });
      toast.success("Caption saved");
    } catch { toast.error("Could not save caption"); }
  };

  const del = async (id) => {
    try { await api.delete(`/admin/content/gallery/${id}`); toast.success("Photo deleted"); reload(); }
    catch { toast.error("Could not delete"); }
  };

  return (
    <div>
      <MultiUpload onDone={reload} />
      {order.length === 0 ? (
        <p className="text-charcoal/40 border border-charcoal/10 p-8 mt-8" data-testid="gallery-empty">No photos yet. Drag & drop images above to build your gallery.</p>
      ) : (
        <>
          <p className="text-sm text-charcoal/50 mt-8 mb-4">Drag cards to reorder · edit captions inline · changes reflect on the public gallery.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="gallery-grid">
            {order.map((it) => (
              <div
                key={it.id}
                draggable
                onDragStart={() => (dragId.current = it.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(it.id)}
                className="border border-charcoal/10 bg-cream"
                data-testid={`gallery-item-${it.id}`}
              >
                <div className="relative">
                  <img src={it.image_url} alt={it.title} className="w-full aspect-square object-cover" />
                  <span className="absolute top-2 left-2 bg-charcoal/70 text-cream p-1 cursor-grab" data-testid="gallery-drag-handle"><GripVertical size={15} /></span>
                  <button onClick={() => del(it.id)} className="absolute top-2 right-2 bg-charcoal/70 text-cream p-1.5 hover:bg-red-600" data-testid={`gallery-delete-${it.id}`} aria-label="Delete photo"><Trash2 size={15} /></button>
                </div>
                <input
                  defaultValue={it.title === "Gallery photo" ? "" : it.title}
                  placeholder="Add a caption…"
                  onBlur={(e) => saveCaption(it, e.target.value)}
                  className="w-full border-t border-charcoal/10 px-3 py-2 text-sm outline-none focus:bg-emerald/5 bg-transparent"
                  data-testid={`gallery-caption-${it.id}`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const FEMPTY = { name: "", role: "", image: "", bio: "" };

const FacultyManager = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(FEMPTY);
  const [editing, setEditing] = useState(null);

  const load = async () => { try { const { data } = await api.get("/instructors"); setList(data); } catch { setList([]); } };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`/admin/instructors/${editing}`, form);
      else await api.post("/admin/instructors", form);
      toast.success(editing ? "Faculty updated" : "Faculty added");
      setForm(FEMPTY); setEditing(null); load();
    } catch (err) { toast.error(err?.response?.status === 401 ? "Session expired" : "Could not save"); }
  };

  const edit = (p) => { setEditing(p.id); setForm({ name: p.name, role: p.role || "", image: p.image || "", bio: p.bio || "" }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const del = async (id) => { try { await api.delete(`/admin/instructors/${id}`); toast.success("Faculty removed"); load(); } catch { toast.error("Could not delete"); } };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <form onSubmit={submit} className="border border-charcoal/10 p-6 space-y-3 h-fit" data-testid="faculty-form">
        <h2 className="font-serif text-2xl text-charcoal flex items-center gap-2">{editing ? "Edit faculty" : <><Plus size={20} /> New faculty</>}</h2>
        <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent" data-testid="faculty-name" />
        <input placeholder="Role (e.g. Principal)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent" data-testid="faculty-role" />
        <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
        <textarea rows={5} placeholder="Biography" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent resize-none" data-testid="faculty-bio" />
        <div className="flex gap-2">
          <button className="flex-1 bg-emerald text-cream py-3 hover:bg-emerald-light transition-colors" data-testid="faculty-save">{editing ? "Update" : "Add faculty"}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(FEMPTY); }} className="px-5 border border-charcoal/20 text-charcoal/60" data-testid="faculty-cancel">Cancel</button>}
        </div>
      </form>
      <div>
        <h2 className="font-serif text-2xl text-charcoal mb-4">Key Personalities</h2>
        {list.length === 0 ? (
          <p className="text-charcoal/40 border border-charcoal/10 p-8" data-testid="faculty-empty">No faculty yet.</p>
        ) : (
          <div className="space-y-3">
            {list.map((p) => (
              <div key={p.id} className="border border-charcoal/10 p-4 flex items-center gap-4" data-testid={`faculty-item-${p.id}`}>
                {p.image && <img src={p.image} alt="" className="w-14 h-14 object-cover shrink-0" />}
                <div className="flex-1 min-w-0"><p className="font-serif text-lg text-charcoal truncate">{p.name}</p><p className="text-charcoal/50 text-sm">{p.role}</p></div>
                <button onClick={() => edit(p)} className="text-charcoal/50 hover:text-emerald" data-testid={`faculty-edit-${p.id}`} aria-label="Edit"><Pencil size={17} /></button>
                <button onClick={() => del(p.id)} className="text-charcoal/40 hover:text-red-600" data-testid={`faculty-delete-${p.id}`} aria-label="Delete"><Trash2 size={17} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Admin() {
  const [authed, setAuthed] = useState(!!getToken());
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [kind, setKind] = useState("news");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [stats, setStats] = useState({ news: 0, events: 0, gallery: 0 });
  const [recentGallery, setRecentGallery] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  const load = async (k) => {
    try { const { data } = await api.get(`/content/${k}`); setItems(data); }
    catch { setItems([]); }
  };

  useEffect(() => { if (authed && KINDS.includes(kind)) load(kind); }, [authed, kind]);

  const loadAll = async () => {
    try {
      const [n, e, g] = await Promise.all([
        api.get('/content/news').then((r) => r.data).catch(() => []),
        api.get('/content/events').then((r) => r.data).catch(() => []),
        api.get('/content/gallery').then((r) => r.data).catch(() => []),
      ]);
      setStats({ news: n.length, events: e.length, gallery: g.length });
      setRecentGallery((g || []).slice(0, 8));
      setRecentEvents((e || []).slice(0, 6));
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => { if (authed) loadAll(); }, [authed]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/admin/login", creds);
      setToken(data.access_token);
      setAuthed(true);
      toast.success("Welcome back");
    } catch { toast.error("Incorrect email or password"); }
  };

  const logout = () => { clearToken(); setAuthed(false); };

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/admin/content/${kind}`, form);
      setForm(EMPTY);
      toast.success("Published");
      load(kind);
      loadAll();
    } catch (err) {
      if (err?.response?.status === 401) { logout(); toast.error("Session expired"); }
      else toast.error("Could not save");
    }
  };

  const remove = async (id) => {
    try { await api.delete(`/admin/content/${kind}/${id}`); toast.success("Deleted"); load(kind); loadAll(); }
    catch { toast.error("Could not delete"); }
  };

  // helper to refresh dashboard when gallery bulk upload or other managers change data
  const refreshAll = () => { if (KINDS.includes(kind)) load(kind); loadAll(); };

  if (!authed)
    return (
      <div className="min-h-screen bg-emerald flex items-center justify-center px-6">
        <form onSubmit={login} className="bg-cream w-full max-w-md p-10 border border-gold/30" data-testid="admin-login-form">
          <span className="font-arabic text-2xl text-gold">مالهار</span>
          <h1 className="mt-2 font-serif text-3xl text-charcoal">Malhar CMS</h1>
          <p className="text-charcoal/50 text-sm mt-1 mb-8">Sign in to manage content</p>
          <input required type="email" placeholder="Email" value={creds.email} onChange={(e) => setCreds({ ...creds, email: e.target.value })} className="w-full border border-charcoal/15 px-4 py-3 mb-3 outline-none focus:border-emerald bg-transparent" data-testid="admin-email" />
          <input required type="password" placeholder="Password" value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} className="w-full border border-charcoal/15 px-4 py-3 mb-6 outline-none focus:border-emerald bg-transparent" data-testid="admin-password" />
          <button className="w-full bg-emerald text-cream py-3.5 hover:bg-emerald-light transition-colors" data-testid="admin-login-submit">Sign In</button>
        </form>
      </div>
    );

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-emerald text-cream px-6 py-4 flex items-center justify-between">
        <span className="font-serif text-xl">Malhar CMS</span>
        <button onClick={logout} className="flex items-center gap-2 text-cream/80 hover:text-gold text-sm" data-testid="admin-logout"><LogOut size={16} /> Logout</button>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-6 mb-6">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="bg-white rounded-xl border border-charcoal/10 p-4 flex-1 min-w-[160px]">
              <p className="text-sm text-charcoal/60">News</p>
              <p className="font-serif text-2xl text-charcoal mt-1">{stats.news}</p>
            </div>
            <div className="bg-white rounded-xl border border-charcoal/10 p-4 flex-1 min-w-[160px]">
              <p className="text-sm text-charcoal/60">Events</p>
              <p className="font-serif text-2xl text-charcoal mt-1">{stats.events}</p>
            </div>
            <div className="bg-white rounded-xl border border-charcoal/10 p-4 flex-1 min-w-[160px]">
              <p className="text-sm text-charcoal/60">Gallery</p>
              <p className="font-serif text-2xl text-charcoal mt-1">{stats.gallery}</p>
            </div>
            <button onClick={() => loadAll()} className="px-4 py-2 border border-charcoal/10 rounded-md text-charcoal/70">Refresh</button>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-1">
              <p className="text-sm text-charcoal/60 mb-2">Recent gallery</p>
              <div className="flex gap-2 flex-wrap">
                {recentGallery.length === 0 ? <p className="text-charcoal/40">No images yet</p> : recentGallery.map((g) => (
                  <img key={g.id} src={g.image_url} alt={g.title} className="w-28 h-16 object-cover rounded-md border border-charcoal/10" />
                ))}
              </div>
            </div>

            <div className="w-96">
              <p className="text-sm text-charcoal/60 mb-2">Upcoming / recent events</p>
              <div className="space-y-2">
                {recentEvents.length === 0 ? <p className="text-charcoal/40">No events yet</p> : recentEvents.map((ev) => (
                  <div key={ev.id} className="rounded-md border border-charcoal/10 p-3 bg-white">
                    <p className="text-sm text-gold-brass">{ev.date}</p>
                    <p className="font-semibold text-charcoal mt-1">{ev.title}</p>
                    {ev.location && <p className="text-sm text-charcoal/60 mt-1">{ev.location}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mb-8 flex-wrap">
          {[...KINDS, "faculty"].map((k) => (
            <button key={k} onClick={() => setKind(k)} className={`px-5 py-2 capitalize border ${kind === k ? "bg-emerald text-cream border-emerald" : "border-charcoal/15 text-charcoal/60"}`} data-testid={`admin-tab-${k}`}>{k}</button>
          ))}
        </div>
        {kind === "gallery" ? (
          <GalleryManager items={items} reload={refreshAll} />
        ) : kind === "faculty" ? (
          <FacultyManager />
        ) : (
        <div className="grid lg:grid-cols-2 gap-10">
          <form onSubmit={create} className="border border-charcoal/10 p-6 space-y-3 h-fit" data-testid="admin-content-form">
            <h2 className="font-serif text-2xl text-charcoal flex items-center gap-2"><Plus size={20} /> New {kind}</h2>
            <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent" data-testid="admin-field-title" />
            <input placeholder="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent" data-testid="admin-field-summary" />
            <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
            {kind === "events" && (
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Date (e.g. 12 Jul)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent" data-testid="admin-field-date" />
                <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent" data-testid="admin-field-location" />
              </div>
            )}
            {kind === "news" && (
              <input placeholder="Date (e.g. 12 Jul 2026)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent" data-testid="admin-field-date" />
            )}
            <textarea rows={4} placeholder="Body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full border border-charcoal/15 px-3 py-2.5 outline-none focus:border-emerald bg-transparent resize-none" data-testid="admin-field-body" />
            <button className="w-full bg-emerald text-cream py-3 hover:bg-emerald-light transition-colors" data-testid="admin-publish">Publish</button>
          </form>

          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-4">Published {kind}</h2>
            {items.length === 0 ? (
              <p className="text-charcoal/40 border border-charcoal/10 p-8">Nothing published yet.</p>
            ) : (
              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="border border-charcoal/10 p-4 flex items-start gap-4" data-testid={`admin-item-${it.id}`}>
                    {it.image_url && <img src={it.image_url} alt="" className="w-16 h-16 object-cover shrink-0" />}
                    <div className="flex-1"><p className="font-serif text-lg text-charcoal">{it.title}</p><p className="text-charcoal/50 text-sm">{it.date || it.summary}</p></div>
                    <button onClick={() => remove(it.id)} className="text-charcoal/40 hover:text-red-600" data-testid={`admin-delete-${it.id}`}><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
