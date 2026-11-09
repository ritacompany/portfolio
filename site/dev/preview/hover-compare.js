// Preview only. Press O to switch the hover text back to the old drawing and compare.
// Press W for the dials: the block text weight (proposal 10) and the bold amount for the small links (13).
// Press 4 or 5 for the small links' hover: brighter and bolder (the default) or brighter only. 1 to 3 are older options.
(() => {
  const root = document.documentElement;
  const get = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  const box = document.createElement("div");
  box.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:99999;padding:8px 10px;font:12px/1.4 system-ui;background:#fff;color:#000;display:none;-webkit-font-smoothing:auto";
  const status = document.createElement("div");
  const dials = document.createElement("div");
  dials.style.display = "none";
  box.append(status, dials);

  const dial = (key, cssVar, def, max, name) => {
    const saved = get(key);
    if (saved !== null) root.style.setProperty(cssVar, saved + "px");
    const label = document.createElement("div");
    const input = Object.assign(document.createElement("input"), { type: "range", min: 0, max, step: 0.01, value: saved ?? def });
    input.style.cssText = "display:block;width:240px";
    const paint = () => { label.textContent = `${name}: ${Number(input.value).toFixed(2)} px`; };
    input.addEventListener("input", () => { root.style.setProperty(cssVar, input.value + "px"); put(key, input.value); paint(); });
    paint(); dials.append(label, input);
  };
  dial("hover-weight-v2", "--hover-weight", 0.05, 0.4, "Block text weight");
  dial("hover-bold-v1", "--bold-weight", 0.36, 0.8, "Small links bolder (0.36 Medium, 0.78 Bold)");

  const NAMES = { 1: "1, block", 2: "2, colour only", 3: "3, line", 4: "4, brighter and bolder", 5: "5, brighter only" };
  const SMALL = "hover-small-v2";
  let small = get(SMALL) || "4";
  const apply = () => { root.classList.remove("small-2", "small-3", "small-4", "small-5"); if (small !== "1") root.classList.add("small-" + small); };
  apply();

  const show = () => {
    status.textContent = root.classList.contains("hover-old")
      ? "Hover: old drawing (press O to go back)"
      : `Small links: option ${NAMES[small]} (press 4 or 5; 1 to 3 are the older ones)`;
    box.style.display = "block"; if (!box.isConnected) document.body.append(box);
  };
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest("input, textarea, [contenteditable]")) return;
    const k = e.key.toLowerCase();
    if (k === "o") { root.classList.toggle("hover-old"); show(); }
    if (k === "w") { dials.style.display = dials.style.display === "none" ? "block" : "none"; show(); }
    if (NAMES[k]) { small = k; put(SMALL, k); apply(); show(); }
  });
})();
