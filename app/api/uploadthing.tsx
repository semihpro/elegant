import { createNextPageApiHandler } from "uploadthing/next-legacy";
 
import { ourFileRouter } from '../../fonctions/uploadthing'
 
const handler = createNextPageApiHandler({
  router: ourFileRouter,
});
 
export default handler;