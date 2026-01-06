(async () => {
    const CONFIG = {
        API_URL: "https://newsgo.space",
        API_KEY: "berbahagia",
        DOMAIN: window.location.origin
    };

    const urlParams = new URLSearchParams(window.location.search);
    const detailSlug = urlParams.get('detail');

    const formatIndoDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " WIB" : "";
    const toTitleCase = (s) => s ? s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()) : "";

    const injectSchema = (data) => {
        const schemaId = 'newsgo-schema';
        let script = document.getElementById(schemaId);
        if (!script) {
            script = document.createElement('script');
            script.id = schemaId;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.text = JSON.stringify(data);
    };

    const renderPage = (innerContent, showTitle = true) => {
		
		const displayDomain = window.location.origin.replace(/^https?:\/\//, '');
		
        document.body.innerHTML = `
			<div id="navnews" class="navbar-fixed-top">
				<div class="container">
					<div class="table-layout nm">
						<div class="col-xs-4 col-md-3 col-lg-2"></div>
						<div class="col-xs-4 col-md-6 col-lg-8">
							<div class="logo-brand text-center">
								<a href="/" class="mh-auto">
									<img id="main-logo" src="https://cdn.jsdelivr.net/gh/luqmanthinkpad/nakal/img/n1_ipotnews.png" class="img-responsive hidden-xs hidden-sm mh-auto">
								</a>

								<a href="/" class="mh-auto">
									<img id="main-logo-mobile" src="https://cdn.jsdelivr.net/gh/luqmanthinkpad/nakal/img/n1_ipotnews_w.png" class="img-responsive visible-xs visible-sm mh-auto">
								</a>
							</div>
						</div>
						<div class="col-xs-4 col-md-3 col-lg-2 text-right"></div>
					</div>
				</div>
			</div>
			<div class="container-fluid hidden-xs hidden-sm"><div id="navbarIpotnews" class="navbar navbar-default"><div class="collapse navbar-collapse" id="ipotnewsMainMenu">
				<ul class="nav navbar-nav navbar-news"></ul>
			</div></div></div>
			
            <div class="clearfix mm-page mm-slideout">
                <section class="startcontent newsonly">
                    <div class="header sub-menu single"><ul class="breadcrumb" role="tablist"></ul></div>
					
					<div class="clearfix"></div>
                    <section class="section pt10 bgcolor-white">
                        <div class="container" id="divMoreNewsPages">
                            ${innerContent}
                        </div>
                    </section>
                </section>
                <footer class="footer pt20 pb20 bgcolor-gray" style="border-top: 1px solid #eee; margin-top: 30px;">
                    <div class="container text-center">
                        <p style="font-size: 12px; color: #777;">&copy; 2026 All rights reserved.</p>
                    </div>
                </footer>
            </div>`;
    };

    const loadHome = async () => {
        try {
            const res = await fetch(`${CONFIG.API_URL}/api/news?key=${CONFIG.API_KEY}`, {
                headers: { 'x-api-key': CONFIG.API_KEY, 'original-domain': CONFIG.DOMAIN }
            });
            const result = await res.json();
            
            if (result.status === "success") {
                const listHtml = result.data.map(news => `
                    <dl class="listNews" style="margin-bottom:20px;">
                        <small>${formatIndoDate(news.created_at)}</small>
                        <dt><a href="?detail=${news.slug}">${toTitleCase(news.keyword)}</a></dt>
                    </dl>`).join('');
                
                renderPage(`<div class="listMoreLeft divColumn" id="news-list">${listHtml}</div>`, true);

                injectSchema({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": result.data.map((news, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "url": `${CONFIG.DOMAIN}/?detail=${news.slug}`
                    }))
                });
            }
        } catch (e) { console.error(e); }
    };

    const loadDetail = async (slug) => {
        try {
            const [resDetail, resRelated, resBacklinks] = await Promise.all([
                fetch(`${CONFIG.API_URL}/api/news/detail/${slug}?key=${CONFIG.API_KEY}`, { headers: {'x-api-key': CONFIG.API_KEY, 'original-domain': CONFIG.DOMAIN} }),
                fetch(`${CONFIG.API_URL}/api/news?limit=6&key=${CONFIG.API_KEY}`, { headers: {'x-api-key': CONFIG.API_KEY, 'original-domain': CONFIG.DOMAIN} }),
                fetch(`${CONFIG.API_URL}/api/backlinks?key=${CONFIG.API_KEY}`, { headers: {'x-api-key': CONFIG.API_KEY, 'original-domain': CONFIG.DOMAIN} })
            ]);

            const d = await resDetail.json();
            const r = await resRelated.json();
            const b = await resBacklinks.json();

            if (d.status === "success") {
                const news = d.data;
                const title = toTitleCase(news.keyword);
                document.title = title;

                let bodyHtml = (news.json_sentences || []).map((text, i) => {
                    let img = news.json_images?.[i] ? `<img src="${news.json_images[i].url}" alt="${title}" style="width:50%; border-radius:8px; margin: 10px 0 20px 0;" loading="lazy">` : "";
                    return `<p style="margin-bottom:15px; font-size:16px; line-height:1.7;">${text}</p>${img}`;
                }).join('');

                injectSchema({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": title,
                    "image": news.json_images?.[0]?.url || "",
                    "datePublished": news.created_at,
                    "author": { "@type": "Organization", "name": "W" }
                });

                const content = `
                    <div class="row">
                        <div class="col-sm-8">
                            <article class="newsContent">
                                <h1 style="font-size: 24px; line-height: 1.3; font-weight:bold;">${title}</h1>
                                <small class="text-muted">${formatIndoDate(news.created_at)}</small>
                                <hr>
                                <div>${bodyHtml}</div>
                                <div style="margin-top: 40px; font-size: 16px; padding:5px; background:#fff; border-radius:8px;">
                                    <h4 class="sidebar-title">Recommended</h4>
                                    ${b.data ? b.data.map(l => `<a href="${l.url}" target="_blank" style="margin-right:10px;">${toTitleCase(l.keyword)}</a>`).join(' <br> ') : ""}
                                </div>
                            </article>
                        </div>
                        <aside class="col-sm-4">
                            <h4 class="sidebar-title">Related Posts</h4>
                            ${r.data ? r.data.map(item => `
                                <dl class="listNews" style="margin-bottom:15px;">
                                    <small class="text-muted" style="font-size:11px;">${formatIndoDate(item.created_at)}</small>
                                    <dt style="font-size:14px;"><a href="?detail=${item.slug}">${toTitleCase(item.keyword)}</a></dt>
                                </dl>`).join('') : ""}
                        </aside>
                    </div>`;

                renderPage(content, false);
            }
        } catch (e) { console.error(e); }
    };

    if (detailSlug) {
        loadDetail(detailSlug);
    } else {
        loadHome();
    }

})();
