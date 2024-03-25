import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.routes';

const router = express.Router();

const modulesRoutes = [
    {
        path: '/user',
        route:userRoutes
    },
    {
        path: '/admin',
        route:AdminRoutes
    },
    {
        path: '/auth',
        route:AuthRoutes
    }
]
modulesRoutes.forEach(route => router.use(route.path,route.route))

export default router