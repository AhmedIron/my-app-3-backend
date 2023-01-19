"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const food_routes_1 = __importDefault(require("./routes/food.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const cors_1 = __importDefault(require("cors"));
const stripe = require('stripe')('sk_test_51MM1zQIV8qv6SuYTW1WNTiVpR0BCN3Uk9mSj7qgzZKZwDyHWllHikSpRl52AZGNbjJJzZg9vi0tvSEmsEKzYfKLI00PohGSoeK');
const app = (0, express_1.default)();
const port = config_1.default.port;
app.use(express_1.default.json(), express_1.default.urlencoded({
    extended: false
}));
app.use("/images/", express_1.default.static("images")); //6
app.use((0, cors_1.default)());
//the route for our home-page
app.get("/", function (req, res) {
    res.send("Hello World!");
});
//the route for our main API ("/api")
app.get("/api", function (req, res) {
    res.send("Hello from API !");
});
app.use("/api/products", food_routes_1.default);
app.use("/api/users", users_routes_1.default);
//payment
app.post("/api/checkout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = [{
            id: 'price_1MM3u8IV8qv6SuYTuslgOp2o',
            quantity: 1
        }];
    console.log(items);
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        });
    });
    const session = yield stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "https://am-restaurant.surge.sh/success",
        cancel_url: "http://localhost:3000/cancel"
    });
    res.send(JSON.stringify({
        url: session.url
    }));
}));
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
});
app.listen(port, () => {
    console.log("server ok....................8000");
});
//sk_test_51MM1zQIV8qv6SuYTW1WNTiVpR0BCN3Uk9mSj7qgzZKZwDyHWllHikSpRl52AZGNbjJJzZg9vi0tvSEmsEKzYfKLI00PohGSoeK
