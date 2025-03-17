import asyncHandler from "express-async-handler";
import HttpError from "../utils/httpError.js";
import { NOT_FOUND, OK, NO_CONTENT } from "../constants/http.codes.js";

//works
const remove = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);

    if (!data) {
      return next(new HttpError("No data found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "data deleted successfully",
    });
  });

//to be finished
const update = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return next(new HttpError("No data found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "doc updated successfully",
      data: {
        data: data,
      },
    });
  });

//works
const getSingle = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data) {
      return next(new HttpError("No document found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "success",
      id: req.params.id,
      data: doc,
    });
  });

//works
const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.find();

    res.status(OK).json({
      status: "success",
      result: doc.length,
      data: {
        data: data,
      },
    });
  });

export { getAll, update, remove, getSingle };
