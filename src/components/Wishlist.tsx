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
import { useEffect, useState } from "react"
import { fetchWishlist, removeFromWishlist } from "../store/wishlistSlice"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { Link } from "react-router-dom"

// Removed the hardcoded wishlistItems array

const ITEMS_PER_PAGE = 4

export function WishlistPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const dispatch = useAppDispatch()
  const wishlist = useSelector((state: RootState) => state.wishlist)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch, isAuthenticated]) 

  const filteredItems = wishlist.items.filter(item => 
    item && item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) // Added null/undefined checks

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  // Removed getStatusVariant as 'status' is not a Product property

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId))
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
              {/* Removed Status column */}
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
                        alt={item.title} // Changed item.name to item.title
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link to={`/product/${item.id}`}> {/* Added Link to product details page */}
                      <div className="font-medium">{item.title}</div> {/* Changed item.name to item.title */}
                    </Link>
                    {/* Removed Date Added from display */}
                  </TableCell>
                  <TableCell>₹{item.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{item.rating.rate}</span> {/* Changed item.rating to item.rating.rate */}
                    </div>
                  </TableCell>
                  {/* Removed Status Cell */}
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
                          <DropdownMenuItem className="text-red-500" onClick={() => handleRemoveFromWishlist(item.id)}> {/* Added onClick handler */}
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : ( // When wishlist is empty
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