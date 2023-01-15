import express, { Application, Request, Response } from "express"
import config from "./config";
import productsRroutes from "./routes/food.routes";
import userRoute from "./routes/users.routes"
import cors from "cors"

const stripe = require('stripe')('sk_test_51MM1zQIV8qv6SuYTW1WNTiVpR0BCN3Uk9mSj7qgzZKZwDyHWllHikSpRl52AZGNbjJJzZg9vi0tvSEmsEKzYfKLI00PohGSoeK')

const app: Application = express();

const port = config.port

app.use(
  express.json(),
  express.urlencoded({
    extended: false
  })
);

app.use("/images/" ,express.static("images")); //6

app.use(cors());


//the route for our home-page
app.get("/", function (req: Request, res: Response) {
    res.send("Hello World!");
  });
  
  //the route for our main API ("/api")
  app.get("/api", function (req: Request, res: Response) {
    res.send("Hello from API !");
  });
  

  app.use("/api/products", productsRroutes);
  app.use("/api/users", userRoute);

  //payment
  app.post("/api/checkout", async (req, res) => {

    const items = [{
      id: 'price_1MM3u8IV8qv6SuYTuslgOp2o',
      quantity: 1
    }]
    console.log(items);
    
    let lineItems: number[] = [] 
    items.forEach((item : any) => {
      lineItems.push(
        {
          price: item.id, 
          quantity: item.quantity
        } as any
      ) 
    });

    const session = await stripe.checkout.sessions.create({
      line_items :  lineItems,
      mode : 'payment',
      success_url : "http://localhost:3000/success",
      cancel_url : "http://localhost:3000/cancel"
    })

    res.send(JSON.stringify({
      url: session.url
    }))
  })
  require('dns').lookup(require('os').hostname(), function (err: any, add: string, fam: any) {
    console.log('addr: ' + add);
  })


app.listen(port, () => {
    console.log("server ok....................8000")
})

//sk_test_51MM1zQIV8qv6SuYTW1WNTiVpR0BCN3Uk9mSj7qgzZKZwDyHWllHikSpRl52AZGNbjJJzZg9vi0tvSEmsEKzYfKLI00PohGSoeK