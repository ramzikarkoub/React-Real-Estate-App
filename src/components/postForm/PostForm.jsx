import React, { useState, useEffect } from "react";
import "./PostForm.css";
import { CLOUDINARY_URL } from "../../utils/env";

export default function PostForm({ onSubmit, initialData, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    address: "",
    city: "",
    bedroom: "",
    bathroom: "",
    type: "rent",
    property: "apartment",
    images: [],
    postDetail: {
      desc: "",
      utilities: "",
      pet: "",
      size: "",
    },
  });

  //  Prevent infinite re-renders by checking for valid initialData
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.postDetail) {
      setFormData((prev) => ({
        ...prev,
        postDetail: { ...prev.postDetail, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle direct Cloudinary upload from the frontend
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", "real_estate");

        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: uploadData,
        });

        const data = await response.json();
        return data.secure_url;
      })
    );

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));
  };

  // Handle image deletion from the form
  const handleImageDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      imageUrls: formData.images,
    };
    onSubmit(payload);
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Edit Listing" : "Add Listing"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Enter listing title"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Enter property address"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="type"
            required
          >
            <option value="Choose " disabled defaultValue="haha">
              Choose a Type
            </option>
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="property">Property</label>

          <select
            id="property"
            name="property"
            value={formData.property}
            onChange={handleChange}
            placeholder="City"
            required
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            id="bedroom"
            type="number"
            name="bedroom"
            value={formData.bedroom || ""}
            onChange={handleChange}
            placeholder="Enter number of bedrooms"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="bathroom">Bathroom</label>
          <input
            id="bathroom"
            type="number"
            name="bathroom"
            value={formData.bathroom || ""}
            onChange={handleChange}
            placeholder="Enter number of bathrooms"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="desc"
            value={formData.postDetail.desc || ""}
            onChange={handleChange}
            placeholder="Enter property description"
            required
          />
        </div>

        <div className="form-field">
          <label>Images</label>
          <input type="file" multiple onChange={handleImageUpload} />
          <div className="image-preview">
            {formData.images.map((url, index) => (
              <div key={index} className="image-item">
                <img src={url} alt={`Upload ${index}`} className="small-img" />
                <button
                  type="button"
                  className="exit-btn"
                  onClick={() => handleImageDelete(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="utilities">Utilities</label>
          <input
            id="utilities"
            type="text"
            name="utilities"
            value={formData.postDetail.utilities || ""}
            onChange={handleChange}
            placeholder="List included utilities"
          />
        </div>

        <div className="form-field">
          <label htmlFor="pet">Pet</label>
          <input
            id="pet"
            type="text"
            name="pet"
            value={formData.postDetail.pet || ""}
            onChange={handleChange}
            placeholder="Is pet allowed? (Yes/No)"
          />
        </div>

        <div className="form-field">
          <label htmlFor="size">Size</label>
          <input
            id="size"
            type="number"
            name="size"
            value={formData.postDetail.size || ""}
            onChange={handleChange}
            placeholder="Enter size in sqft"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="button-save">
            {initialData ? "Update" : "Add"}
          </button>
          <button type="button" className="button-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
