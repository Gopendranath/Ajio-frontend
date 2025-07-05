import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
//   PaginationNext,
//   PaginationPrevious,
} from "@/components/ui/pagination"
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Search,
  Heart,
  ShoppingCart,
  Trash2,
  Share2,
  Star,
//   Clock,
//   CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const wishlistItems = [
  {
    id: "WL-1001",
    name: "Wireless Bluetooth Headphones",
    price: 5999,
    dateAdded: "2023-10-15",
    status: "In Stock",
    rating: 4.5,
    image: "/headphones.jpg",
  },
  {
    id: "WL-1002",
    name: "Smart Watch with Fitness Tracker",
    price: 8999,
    dateAdded: "2023-10-18",
    status: "Low Stock",
    rating: 4.2,
    image: "/smartwatch.jpg",
  },
  {
    id: "WL-1003",
    name: "Wireless Charging Pad",
    price: 1999,
    dateAdded: "2023-10-20",
    status: "Out of Stock",
    rating: 3.8,
    image: "/charger.jpg",
  },
  {
    id: "WL-1004",
    name: "Premium Leather Backpack",
    price: 4599,
    dateAdded: "2023-10-22",
    status: "In Stock",
    rating: 4.7,
    image: "/backpack.jpg",
  },
  {
    id: "WL-1005",
    name: "Noise Cancelling Earbuds",
    price: 7999,
    dateAdded: "2023-10-25",
    status: "In Stock",
    rating: 4.3,
    image: "/earbuds.jpg",
  },
  {
    id: "WL-1006",
    name: "Ultra HD Action Camera",
    price: 12999,
    dateAdded: "2023-10-28",
    status: "Pre-order",
    rating: 4.6,
    image: "/camera.jpg",
  },
  {
    id: "WL-1007",
    name: "Ergonomic Wireless Mouse",
    price: 2499,
    dateAdded: "2023-11-01",
    status: "In Stock",
    rating: 4.1,
    image: "/mouse.jpg",
  },
  {
    id: "WL-1008",
    name: "Portable Bluetooth Speaker",
    price: 3499,
    dateAdded: "2023-11-05",
    status: "In Stock",
    rating: 4.4,
    image: "/speaker.jpg",
  },
]

const ITEMS_PER_PAGE = 4

export function WishlistPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter items based on search term
  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default"
      case "Low Stock":
        return "secondary"
      case "Out of Stock":
        return "destructive"
      case "Pre-order":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="grid gap-4 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-pink-500" />
          <h1 className="text-2xl font-bold tracking-tight">My Wishlist</h1>
          <Badge variant="outline" className="ml-2">
            {filteredItems.length} items
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Date added (newest)</DropdownMenuItem>
              <DropdownMenuItem>Date added (oldest)</DropdownMenuItem>
              <DropdownMenuItem>Price (high to low)</DropdownMenuItem>
              <DropdownMenuItem>Price (low to high)</DropdownMenuItem>
              <DropdownMenuItem>Rating</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your wishlist..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1) // Reset to first page when searching
          }}
        />
      </div>

      {/* Wishlist Items */}
      <Card className="overflow-x-auto">
        <Table className="min-w-[600px] md:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="h-16 w-16 rounded-md overflow-hidden border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Added: {item.dateAdded}
                    </div>
                  </TableCell>
                  <TableCell>₹{item.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{item.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {searchTerm ? (
                    <div className="flex flex-col items-center gap-2">
                      <Heart className="h-8 w-8 text-pink-500" />
                      <p>No items match your search</p>
                      <Button
                        variant="outline"
                        onClick={() => setSearchTerm("")}
                      >
                        Clear search
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Heart className="h-8 w-8 text-pink-500" />
                      <p>Your wishlist is empty</p>
                      <Button>Start shopping</Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {filteredItems.length > 0 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {Math.min(
                (currentPage - 1) * ITEMS_PER_PAGE + 1,
                filteredItems.length
              )}
              -
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)}
            </strong>{" "}
            of <strong>{filteredItems.length}</strong> items
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}