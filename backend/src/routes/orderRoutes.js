import { Router } from "express";
const router = Router();

router.get("/health", (req, res) => {
	res.json({ ok: true, service: "orders" });
});

export default router;
