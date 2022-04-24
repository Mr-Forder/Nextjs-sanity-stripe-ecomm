import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "t38gq6dc",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token:
    "sk1OpjJhDg4yDuVBnTqmXx9vThWfuOEINepLJ6knhcmio7ULjmd9rBuOqpOQ5tLWKHLw9MMf2jLtqVQIN9ITL6ph9aaSicCqjXr5s5zXpDaRKmAQP6nK9gXq07fKUVS8eW24I9ISOTNM0fYHPxj2hvOphH9nnJNoNeXYtqLz5IHwHVnbwJm8",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
