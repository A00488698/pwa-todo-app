const CACHE_NAME = "todo-cache-v1";
const urlsToCache = [
    "/", // 确保首页被缓存
    "/index.html",
    "/src/main.jsx",
    "/smu-icon-192x192.png",
    "/icons/icon-512x512.png"
];

// 📌 监听 `install` 事件（安装 Service Worker，缓存文件）
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching assets...");
            return cache.addAll(urlsToCache);
        })
    );
});

// 📌 监听 `activate` 事件（清理旧缓存）
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activated!");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Clearing old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 📌 监听 `fetch` 事件（拦截请求，实现离线支持）
self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetching:", event.request.url);
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // 📝 仅缓存 GET 请求
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }
                // 🏷️ 克隆响应对象并存入缓存
                let responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            })
            .catch(() => {
                console.warn("[Service Worker] Fetch failed, returning cached content.");
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    } else if (event.request.destination === "document") {
                        return caches.match("/index.html");
                    }
                });
            })
    );
});