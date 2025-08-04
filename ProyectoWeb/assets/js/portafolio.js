function cargarPortafolio() {
    const url = `https://sebas973.github.io/WebDesignUTN/ProyectoWeb/assets/json/InstagramPosts.json`;

    $.getJSON(url, function (data) {
        $.each(data, function (index, posts) {
            const cardHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${posts.ImageId}/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="width:100%; margin:0 auto;"></blockquote>
                    </div>
                </div>
            </div>
            `;

            $('#InstagramPostsContainer').append(cardHTML);
        })
    });
}