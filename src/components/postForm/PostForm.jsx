import React, { useState, useEffect } from "react";
import "./PostForm.css";

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

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dkyzsx1az/image/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

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
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Bedroom</label>
          <input
            type="number"
            name="bedroom"
            value={formData.bedroom || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Bathroom</label>
          <input
            type="number"
            name="bathroom"
            value={formData.bathroom || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea
            name="desc"
            value={formData.postDetail.desc || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Images</label>
          <input type="file" multiple onChange={handleImageUpload} />
          <div className="image-preview">
            {formData.images.map((url, index) => (
              <div key={index} className="image-item">
                <img src={url} alt={`Upload ${index}`} />
                <button type="button" onClick={() => handleImageDelete(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label>Utilities</label>
          <input
            type="text"
            name="utilities"
            value={formData.postDetail.utilities || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Pet</label>
          <input
            type="text"
            name="pet"
            value={formData.postDetail.pet || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Size</label>
          <input
            type="number"
            name="size"
            value={formData.postDetail.size || ""}
            onChange={handleChange}
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
