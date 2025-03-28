import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";

const CarouselModal = ({ show, onHide, onSave, item }) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        link: item.link || "",
        image: null,
        imagePreview: item.image || "",
      });
    } else {
      setFormData({ title: "", link: "", image: null, imagePreview: "" });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file), // Show preview instantly
      }));
    }
  };
  
  const handleSubmit = () => {
    if (!formData.title || !formData.link || !formData.image) {
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("link", formData.link);

    if (formData.image instanceof File) {
      formDataObj.append("image", formData.image);
    }

    onSave(formDataObj);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered style={{ zIndex: "1234" }}>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold">
          {item ? "Edit Carousel" : "Add Carousel"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter carousel title"
              className="p-2"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Link</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter carousel link"
              className="p-2"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2"
            />
            {formData.imagePreview && (
              <div className="mt-3 text-center">
                <Image
                  src={formData.imagePreview}
                  alt="Preview"
                  thumbnail
                  fluid
                  style={{
                    maxHeight: "200px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="px-4 py-3">
        <Row className="w-100">
          <Col xs={6}>
            <Button
              variant="outline-secondary"
              onClick={onHide}
              className="w-100 py-2"
            >
              Cancel
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="w-100 py-2"
            >
              {item ? "Save Changes" : "Add"}
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default CarouselModal;
