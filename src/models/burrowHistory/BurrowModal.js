import BurrowSchema from "./BurrowSchema.js";

// insert
export const insertBurrow = (obj) => {
  return BurrowSchema(obj).save();
};

// Read all for the admin || public
export const getAllBurrows = (filter) => {
  return BurrowSchema.find(filter);
};

//get Burrow by Id
export const getABurrowById = (_id) => {
  return BurrowSchema.findById(_id);
};

//Update Burrow by Id
export const updateBurrowById = (_id, obj) => {
  return BurrowSchema.findByIdAndUpdate(_id, obj, { new: true });
};

//Delete Burrow by Id
export const deleteBurrowById = (_id) => {
  return BurrowSchema.findByIdAndDelete(_id);
};
