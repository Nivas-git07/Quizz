import { Router } from "express";
import Certificate from "../models/Certificate.js";

const router = Router();

/**
 * POST /api/certificates
 * Body: { studentName, rollNo, technology, score, date, pdfUrl?, sharedVia? }
 */

router.post("/", async (req, res) => {
  try {
    const { studentName, rollNo, technology, score, date, pdfUrl, sharedVia } =
      req.body;

    if (
      !studentName ||
      !rollNo ||
      !technology ||
      score === undefined ||
      !date
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const created = await Certificate.create({
      studentName,
      rollNo,
      technology,
      score: Number(score),
      date,
      pdfUrl,
      sharedVia,
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error("Create certificate error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});
// 
//   const formData = new FormData();
//   formData.append("pdf", pdfFile); // pdfFile is from input[type=file]

//   try {
//     const res = await fetch("http://localhost:5000/api/certificates", {
//       method: "POST",
//       body: formData, // Don't set Content-Type manually
//     });

//     const data = await res.json();
//     console.log("Upload success:", data);
//   } catch (err) {
//     console.error("Upload error:", err);
//   }
// };
/**
 * GET /api/certificates
 * Query: page, limit, search
 */
router.get("/", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "20", 10), 1),
      100
    );
    const search = (req.query.search || "").trim();

    const filter = search
      ? {
          $or: [
            { studentName: { $regex: search, $options: "i" } },
            { rollNo: { $regex: search, $options: "i" } },
            { technology: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      Certificate.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Certificate.countDocuments(filter),
    ]);

    return res.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("List certificates error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});

/**
 * DELETE /api/certificates/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Certificate.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found." });
    return res.json({ message: "Deleted.", id });
  } catch (err) {
    console.error("Delete certificate error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});

export default router;
