"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { fetchCategories, fetchProducts } from "@/lib/api";
import {
  BarChart3,
  Edit,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  marvelCategory: string;
  description: string;
  features: string[];
  price: number;
  status: "Active" | "Inactive";
  views: number;
  images: string[];
  image: string;
  createdAt: string;
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    marvelCategory: "",
    description: "",
    features: [],
    price: 0,
    status: "Active",
  });
  const [images, setImages] = useState<File[]>([]);
  const [editImages, setEditImages] = useState<File[]>([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        if (data.success) setCategories(data.categories);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          setProducts(
            data.products.map((prod: any) => ({
              id: prod._id,
              name: prod.productName,
              category: prod.category?._id || prod.category,
              marvelCategory: prod.marvelCategory,
              description: prod.description,
              features: prod.features || [],
              price: prod.price,
              status: prod.status,
              views: prod.views || 0,
              images: prod.images || [],
              image: prod.images?.[0] || "/marvel-mattress.jpg",
              createdAt: new Date(prod.createdAt).toISOString().split("T")[0],
            }))
          );
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          categories.find((c) => c._id === product.category)?.name ===
          filterCategory
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((product) => product.status === filterStatus);
    }
    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, filterStatus, categories]);

  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.marvelCategory ||
      !newProduct.description ||
      !newProduct.price
    ) {
      alert("All fields are required.");
      return;
    }
    const formData = new FormData();
    formData.append("productName", newProduct.name!);
    formData.append("price", newProduct.price!.toString());
    formData.append("category", newProduct.category!);
    formData.append("marvelCategory", newProduct.marvelCategory!);
    formData.append("description", newProduct.description!);
    formData.append("status", newProduct.status || "Active");
    images.forEach((img) => formData.append("images", img));
    const res = await fetch("http://localhost:4000/api/products/add", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setProducts([
        ...products,
        {
          id: data.product._id,
          name: data.product.productName,
          category: data.product.category,
          marvelCategory: data.product.marvelCategory,
          description: data.product.description,
          features: data.product.features || [],
          price: data.product.price,
          status: data.product.status,
          views: 0,
          images: data.product.images || [],
          image: data.product.images?.[0] || "/marvel-mattress.jpg",
          createdAt: new Date(data.product.createdAt)
            .toISOString()
            .split("T")[0],
        },
      ]);
      setNewProduct({
        name: "",
        category: "",
        marvelCategory: "",
        description: "",
        features: [],
        price: 0,
        status: "Active",
      });
      setImages([]);
      setIsAddDialogOpen(false);
    } else {
      alert(data.message || "Failed to add product");
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;
    const formData = new FormData();
    formData.append("productName", selectedProduct.name);
    formData.append("price", selectedProduct.price.toString());
    formData.append("category", selectedProduct.category);
    formData.append("marvelCategory", selectedProduct.marvelCategory);
    formData.append("description", selectedProduct.description);
    formData.append("status", selectedProduct.status || "Active");
    editImages.forEach((img) => formData.append("images", img));
    const res = await fetch(
      `http://localhost:4000/api/products/${selectedProduct.id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.success) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                name: data.product.productName,
                category: data.product.category,
                marvelCategory: data.product.marvelCategory,
                description: data.product.description,
                features: data.product.features || [],
                price: data.product.price,
                status: data.product.status,
                images: data.product.images || [],
                image: data.product.images?.[0] || "/marvel-mattress.jpg",
              }
            : p
        )
      );
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      setEditImages([]);
    } else {
      alert(data.message || "Failed to update product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const res = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setProducts(products.filter((product) => product.id !== id));
    } else {
      alert(data.message || "Failed to delete product");
    }
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct({ ...product });
    setIsEditDialogOpen(true);
    setEditImages([]);
  };

  const getCategoryName = (id: string) =>
    categories.find((c) => c._id === id)?.name || "";

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-wide">
            Products Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your Marvel Factory product catalog
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-lg hover:from-red-700 hover:to-pink-900">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl shadow-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new Marvel-themed mattress product
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, category: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marvelCategory">Marvel Category</Label>
                  <Select
                    value={newProduct.marvelCategory}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, marvelCategory: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select Marvel category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="Character">Character</SelectItem>
                      <SelectItem value="Movie">Movie</SelectItem>
                      <SelectItem value="Comic">Comic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>
              {/* Multiple Image Upload Option */}
              <div className="space-y-2">
                <Label htmlFor="images">Product Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImages(Array.from(e.target.files));
                    }
                  }}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {images.map((img, idx) => (
                    <span key={idx} className="text-xs text-gray-400">
                      {img.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-lg hover:from-red-700 hover:to-pink-900"
              >
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-100">
                  {products.length}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Active Products
                </p>
                <p className="text-2xl font-bold text-gray-100">
                  {products.filter((p) => p.status === "Active").length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-gray-100">
                  {products
                    .reduce((sum, p) => sum + p.views, 0)
                    .toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-100">
                  $
                  {Math.round(
                    products.reduce((sum, p) => sum + p.price, 0) /
                      (products.length || 1)
                  ).toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-white">
            Products ({filteredProducts.length})
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage your product catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Product</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Views</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-gray-800 hover:bg-gray-800/60 rounded-lg transition"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/marvel-mattress.jpg"}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {product.marvelCategory}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-gray-800/80"
                      >
                        {getCategoryName(product.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      ${product.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white">
                      {product.views.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "Active" ? "default" : "secondary"
                        }
                        className={
                          product.status === "Active"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredProducts.length === 0 && (
              <p className="text-gray-300 mt-4">No products found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        name: e.target.value,
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={selectedProduct.category}
                    onValueChange={(value) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedProduct.status}
                    onValueChange={(value) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        status: value as "Active" | "Inactive",
                      })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-images">Replace Images</Label>
                <Input
                  id="edit-images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setEditImages(Array.from(e.target.files));
                    }
                  }}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {editImages.map((img, idx) => (
                    <span key={idx} className="text-xs text-gray-400">
                      {img.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditProduct}
              className="bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-lg hover:from-red-700 hover:to-pink-900"
            >
              Update Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
