import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Edit,
  Trash,
  ArrowLeft,
  Star,
  Package,
  DollarSign,
  Bookmark,
  BarChart2,
  ShoppingCart,
} from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const product = {
    id: 1,
    name: "Product Example",
    description:
      "Product description here with more detailed information about the features and benefits of this amazing product.",
    price: 99.99,
    stock: 50,
    category: "Category",
    sku: "SKU123",
    rating: 4.5,
    images: [
      "https://via.placeholder.com/400x400",
      "https://via.placeholder.com/400x400",
      "https://via.placeholder.com/400x400",
    ],
  };

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const relatedProducts = [
    {
      id: 1,
      ProductDetails,
      name: "Product A",
      price: 79.99,
      image: "https://via.placeholder.com/200x200",
    },
    {
      id: 2,
      name: "Product B",
      price: 89.99,
      image: "https://via.placeholder.com/200x200",
    },
    {
      id: 3,
      name: "Product C",
      price: 69.99,
      image: "https://via.placeholder.com/200x200",
    },
    {
      id: 4,
      name: "Product D",
      price: 99.99,
      image: "https://via.placeholder.com/200x200",
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 md:p-8 lg:p-10 animate-fade-in">
        <div className="glass-morphism rounded-lg overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/products")}
                  className="hover-lift"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Back to List
                </Button>
                <h1 className="text-gradient">{product.name}</h1>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" onClick={() => console.log("Edit")}>
                  <Edit className="mr-1" size={18} />
                  Edit
                </Button>
                <Button
                  className="btn-primary"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash className="mr-1" size={18} />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Image Gallery */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full rounded-lg hover-lift"
                />
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name} ${idx + 2}`}
                      className="w-full rounded-lg hover-lift"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-primary" size={20} />
                      <h3 className="text-sm font-medium">Price</h3>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <Package className="text-primary" size={20} />
                      <h3 className="text-sm font-medium">Stock</h3>
                    </div>
                    <p className="mt-1 text-xl font-semibold">
                      {product.stock} units
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <Bookmark className="text-primary" size={20} />
                      <h3 className="text-sm font-medium">Category</h3>
                    </div>
                    <p className="mt-1">{product.category}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <Star className="text-primary" size={20} />
                      <h3 className="text-sm font-medium">Rating</h3>
                    </div>
                    <p className="mt-1 font-semibold">{product.rating} / 5.0</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="read-the-docs">{product.description}</p>
                </div>

                <Button className="w-full mt-6 btn-primary">
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </Button>
              </div>

              {/* Sales Chart */}
              <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart2 className="text-primary" size={24} />
                  <h2>Sales Performance</h2>
                </div>
                <Line
                  data={salesData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <h2 className="mb-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <div key={product.id} className="card hover-lift">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-primary font-semibold">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="p-6">
          <h2 className="mb-4">Confirm Deletion</h2>
          <p className="read-the-docs mb-6">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="btn-primary"
              onClick={() => {
                console.log("Delete confirmed");
                setShowDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default ProductDetails;
