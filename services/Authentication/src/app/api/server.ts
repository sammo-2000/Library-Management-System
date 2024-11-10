 
 import app from './app.js';
 import dotenv from "dotenv";
 dotenv.config(); 
 import { env } from "../../types/envTypes.js"
 

const port = env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});











 





