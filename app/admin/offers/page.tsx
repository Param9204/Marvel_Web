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
import {
  Calendar,
  Edit,
  Filter,
  Gift,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: "percentage" | "fixed";
  validFrom: string;
  validTo: string;
  status: "Active" | "Expired" | "Scheduled";
  views: number;
  conversions: number;
  code: string;
  createdAt: string;
}

const mockOffers: Offer[] = [
  {
    id: "1",
    title: "Hero's Welcome - 30% Off Premium Range",
    description:
      "New customers get 30% off all premium Marvel mattresses. Perfect for starting your superhero journey.",
    discount: 30,
    discountType: "percentage",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    status: "Active",
    views: 5420,
    conversions: 234,
    code: "HERO30",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Free Pillow with Any Purchase",
    description:
      "Get a complimentary Marvel-themed pillow with any mattress purchase. Limited time offer.",
    discount: 0,
    discountType: "fixed",
    validFrom: "2024-02-01",
    validTo: "2024-03-31",
    status: "Active",
    views: 3210,
    conversions: 156,
    code: "FREEPILLOW",
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    title: "Extended Warranty - 2 Years Extra",
    description:
      "Extend your mattress warranty by 2 additional years at no extra cost.",
    discount: 0,
    discountType: "fixed",
    validFrom: "2024-01-15",
    validTo: "2024-06-15",
    status: "Active",
    views: 2890,
    conversions: 89,
    code: "WARRANTY2",
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    title: "Black Friday Mega Sale - 50% Off",
    description:
      "Biggest sale of the year! 50% off all Marvel Factory mattresses.",
    discount: 50,
    discountType: "percentage",
    validFrom: "2023-11-24",
    validTo: "2023-11-27",
    status: "Expired",
    views: 12450,
    conversions: 567,
    code: "BLACKFRIDAY50",
    createdAt: "2023-11-01",
  },
];

export default function OffersManagement() {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>(mockOffers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [newOffer, setNewOffer] = useState<Partial<Offer>>({
    title: "",
    description: "",
    discount: 0,
    discountType: "percentage",
    validFrom: "",
    validTo: "",
    code: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const updatedOffers = offers.map((offer) => {
      if (offer.validTo < today) {
        return { ...offer, status: "Expired" as const };
      } else if (offer.validFrom > today) {
        return { ...offer, status: "Scheduled" as const };
      } else {
        return { ...offer, status: "Active" as const };
      }
    });
    setOffers(updatedOffers);
  }, []);

  useEffect(() => {
    let filtered = offers;
    if (searchTerm) {
      filtered = filtered.filter(
        (offer) =>
          offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((offer) => offer.status === filterStatus);
    }
    setFilteredOffers(filtered);
  }, [offers, searchTerm, filterStatus]);

  const generateOfferCode = (title: string) => {
    return title
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, 10);
  };

  const handleAddOffer = () => {
    const offer: Offer = {
      id: Date.now().toString(),
      title: newOffer.title || "",
      description: newOffer.description || "",
      discount: newOffer.discount || 0,
      discountType:
        (newOffer.discountType as "percentage" | "fixed") || "percentage",
      validFrom: newOffer.validFrom || "",
      validTo: newOffer.validTo || "",
      status: "Active",
      views: 0,
      conversions: 0,
      code: newOffer.code || generateOfferCode(newOffer.title || ""),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setOffers([...offers, offer]);
    setNewOffer({
      title: "",
      description: "",
      discount: 0,
      discountType: "percentage",
      validFrom: "",
      validTo: "",
      code: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditOffer = () => {
    if (!selectedOffer) return;
    const updatedOffers = offers.map((offer) =>
      offer.id === selectedOffer.id ? selectedOffer : offer
    );
    setOffers(updatedOffers);
    setIsEditDialogOpen(false);
    setSelectedOffer(null);
  };

  const handleDeleteOffer = (id: string) => {
    setOffers(offers.filter((offer) => offer.id !== id));
  };

  const openEditDialog = (offer: Offer) => {
    setSelectedOffer({ ...offer });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Expired":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Scheduled":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const totalViews = offers.reduce((sum, offer) => sum + offer.views, 0);
  const totalConversions = offers.reduce(
    (sum, offer) => sum + offer.conversions,
    0
  );
  const conversionRate =
    totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-wide">
            Offers Management
          </h1>
          <p className="text-gray-400 mt-1">
            Create and manage promotional offers for Marvel Factory
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-lg hover:from-red-700 hover:to-pink-900">
              <Plus className="h-4 w-4 mr-2" />
              Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl shadow-2xl">
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
              <DialogDescription>
                Design a new promotional offer for your customers
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  value={newOffer.title}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, title: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="e.g., Hero's Welcome - 30% Off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newOffer.description}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, description: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  placeholder="Describe the offer details..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Value</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={newOffer.discount}
                    onChange={(e) =>
                      setNewOffer({
                        ...newOffer,
                        discount: Number(e.target.value),
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select
                    value={newOffer.discountType}
                    onValueChange={(value) =>
                      setNewOffer({
                        ...newOffer,
                        discountType: value as "percentage" | "fixed",
                      })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={newOffer.validFrom}
                    onChange={(e) =>
                      setNewOffer({ ...newOffer, validFrom: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validTo">Valid To</Label>
                  <Input
                    id="validTo"
                    type="date"
                    value={newOffer.validTo}
                    onChange={(e) =>
                      setNewOffer({ ...newOffer, validTo: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Offer Code</Label>
                <Input
                  id="code"
                  value={newOffer.code}
                  onChange={(e) =>
                    setNewOffer({
                      ...newOffer,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Auto-generated from title"
                />
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
                onClick={handleAddOffer}
                className="bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-lg hover:from-red-700 hover:to-pink-900"
              >
                Create Offer
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
                  Total Offers
                </p>
                <p className="text-2xl font-bold text-gray-100">
                  {offers.length}
                </p>
              </div>
              <Gift className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Active Offers
                </p>
                <p className="text-2xl font-bold text-gray-100">
                  {offers.filter((o) => o.status === "Active").length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-gray-100">
                  {totalViews.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-gray-100">
                  {conversionRate}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
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
                  placeholder="Search offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Offers Table */}
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-white">
            Offers ({filteredOffers.length})
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage your promotional offers and track performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Offer</TableHead>
                  <TableHead className="text-gray-300">Discount</TableHead>
                  <TableHead className="text-gray-300">Validity</TableHead>
                  <TableHead className="text-gray-300">Performance</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer) => (
                  <TableRow
                    key={offer.id}
                    className="border-gray-800 hover:bg-gray-800/60 rounded-lg transition"
                  >
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{offer.title}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {offer.description.substring(0, 60)}...
                        </p>
                        <Badge
                          variant="outline"
                          className="mt-2 border-gray-600 text-gray-300 text-xs bg-gray-800/80"
                        >
                          {offer.code}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-white font-medium">
                        {offer.discount > 0
                          ? `${offer.discount}${
                              offer.discountType === "percentage" ? "%" : "$"
                            } OFF`
                          : "Special Offer"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-white">{offer.validFrom}</p>
                        <p className="text-gray-400">to {offer.validTo}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-white">
                          {offer.views.toLocaleString()} views
                        </p>
                        <p className="text-gray-400">
                          {offer.conversions} conversions
                        </p>
                        <p className="text-xs text-green-400">
                          {offer.views > 0
                            ? ((offer.conversions / offer.views) * 100).toFixed(
                                1
                              )
                            : "0"}
                          % rate
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(offer.status)}
                      >
                        {offer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(offer)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteOffer(offer.id)}
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
            {filteredOffers.length === 0 && (
              <p className="text-gray-300 mt-4">No offers found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Offer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle>Edit Offer</DialogTitle>
            <DialogDescription>
              Update offer information and settings
            </DialogDescription>
          </DialogHeader>
          {selectedOffer && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Offer Title</Label>
                <Input
                  id="edit-title"
                  value={selectedOffer.title}
                  onChange={(e) =>
                    setSelectedOffer({
                      ...selectedOffer,
                      title: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedOffer.description}
                  onChange={(e) =>
                    setSelectedOffer({
                      ...selectedOffer,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-discount">Discount Value</Label>
                  <Input
                    id="edit-discount"
                    type="number"
                    value={selectedOffer.discount}
                    onChange={(e) =>
                      setSelectedOffer({
                        ...selectedOffer,
                        discount: Number(e.target.value),
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-discountType">Discount Type</Label>
                  <Select
                    value={selectedOffer.discountType}
                    onValueChange={(value) =>
                      setSelectedOffer({
                        ...selectedOffer,
                        discountType: value as "percentage" | "fixed",
                      })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-validFrom">Valid From</Label>
                  <Input
                    id="edit-validFrom"
                    type="date"
                    value={selectedOffer.validFrom}
                    onChange={(e) =>
                      setSelectedOffer({
                        ...selectedOffer,
                        validFrom: e.target.value,
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-validTo">Valid To</Label>
                  <Input
                    id="edit-validTo"
                    type="date"
                    value={selectedOffer.validTo}
                    onChange={(e) =>
                      setSelectedOffer({
                        ...selectedOffer,
                        validTo: e.target.value,
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code">Offer Code</Label>
                <Input
                  id="edit-code"
                  value={selectedOffer.code}
                  onChange={(e) =>
                    setSelectedOffer({
                      ...selectedOffer,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
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
              onClick={handleEditOffer}
              className="bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-lg hover:from-red-700 hover:to-pink-900"
            >
              Update Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
