import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'exhd3ks6',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2025-01-01', // use current date (YYYY-MM-DD) to target the latest API version
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: any) {
  return builder.image(source)
}
