import express from 'express';
import {
    Payment,
    Confirm, 
    GetAllOrderByUserId, 
    GetAllOrder, 
    GetAllDelivered, 
    ChangeStatus, 
    GetAllOutForDel, 
    GetAllPlacedOrder, 
    GetAllShipped,
    GetTotalAllOrder,
    GetTotalDeliveredOrder,
    GetTotalOutOrder,
    GetTotalPlacedOrder,
    GetTotalShippedOrder,
    DeleteAll
} from '../controllers/OrderController.js'
import IsUserLoggedIn from '../util/IsUserLoggedIn.js'
import IsAdminLoggedIn from '../util/IsAdminLoggedIn.js'
let routes = express.Router();

routes.post("/payment", IsUserLoggedIn, Payment);
routes.post("/confirm", IsUserLoggedIn, Confirm);
routes.get("/getall", IsUserLoggedIn, GetAllOrderByUserId);


routes.get("/deleteall",  DeleteAll);
routes.get("/getallorder", IsAdminLoggedIn, GetAllOrder);
routes.get("/getallpalced", IsAdminLoggedIn, GetAllPlacedOrder);
routes.get("/getalldevelivered", IsAdminLoggedIn, GetAllDelivered);
routes.get("/getalloutfordel", IsAdminLoggedIn, GetAllOutForDel);
routes.get("/getallshipped", IsAdminLoggedIn, GetAllShipped);


routes.get("/gettotalallorder", IsAdminLoggedIn, GetTotalAllOrder);
routes.get("/gettotalpalced", IsAdminLoggedIn, GetTotalPlacedOrder);
routes.get("/gettotaldevelivered", IsAdminLoggedIn, GetTotalDeliveredOrder);
routes.get("/gettotalout", IsAdminLoggedIn, GetTotalOutOrder);
routes.get("/gettotalshipped", IsAdminLoggedIn, GetTotalShippedOrder);



routes.put("/changestatus/:id", IsAdminLoggedIn, ChangeStatus)

export default routes;