using api.Models;

namespace api.Data.Seeders;

public static class PostsSeeds
{
    public static List<Post> LoadPosts(string defaultImageUrl)
    {
        List<Post> posts = new List<Post>
        {
            new Post
            {
                Id = 1,
                Title = "Engrenagens pela metade do preço",
                Description =
                    "Engrenagens de todos os tamanhos pela metade do preço na magazine luíza",
                Address = new Address { Id = 1, CityId = 1, },
                OldPrice = 500,
                PromotionPrice = 250,
                UserId = 2,
                Image = defaultImageUrl,
            },
            new Post
            {
                Id = 2,
                Address = new Address { Id = 2, CityId = 2, },
                Title = "Feijão de 2kg com 40% off",
                Description = "Feijão mais barato no supermercado BH",
                OldPrice = 16,
                PromotionPrice = (decimal)(16 * 0.16),
                UserId = 5,
                Image = defaultImageUrl,
            },
            new Post
            {
                Id = 3,
                Address = new Address { Id = 3, CityId = 2, },
                Title = "Ferro de solda baratíssimo",
                Description = "SUA ÚLTIMA OPORTUNIDADE DE APROVEITA A PROMOÇÃO DO FERRO DE SOLDA",
                OldPrice = 160,
                PromotionPrice = 157,
                UserId = 5,
                Image = defaultImageUrl,
            },
            new Post
            {
                Id = 4,
                Address = new Address { Id = 4, CityId = 3, },
                Title = "Batata frita em promoção no Bretas",
                Description =
                    "Batata frita da Seare tá mais barata no Bretas. Mas já está acabando.",
                OldPrice = 16,
                PromotionPrice = 10.50m,
                UserId = 3,
                Image = defaultImageUrl,
            },
            new Post
            {
                Id = 5,
                Address = new Address { Id = 5, CityId = 1, },
                Title = "Caixa de som bluetooh usada",
                Description = "Uso ela faz 20 anos, comprei um nokia Q5 que é mais alto;",
                OldPrice = 80,
                PromotionPrice = 60.54m,
                UserId = 6,
                Image = defaultImageUrl,
            },
        };
        posts.ForEach(post => post.Create());
        return posts;
    }
}
