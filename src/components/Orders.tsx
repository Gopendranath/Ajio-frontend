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
  DropdownMenuCheckboxItem,
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
  Package,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"

const orders = [
  {
    id: "ORD-12345",
    date: "2023-10-15",
    status: "Delivered",
    items: 3,
    total: 2499,
    tracking: "TRK-987654",
    deliveryDate: "2023-10-20",
  },
  {
    id: "ORD-12346",
    date: "2023-10-18",
    status: "Shipped",
    items: 1,
    total: 899,
    tracking: "TRK-987655",
    deliveryDate: "2023-10-25",
  },
  {
    id: "ORD-12347",
    date: "2023-10-20",
    status: "Processing",
    items: 5,
    total: 4599,
    tracking: null,
    deliveryDate: null,
  },
  {
    id: "ORD-12348",
    date: "2023-10-22",
    status: "Cancelled",
    items: 2,
    total: 1598,
    tracking: null,
    deliveryDate: null,
  },
  {
    id: "ORD-12349",
    date: "2023-10-25",
    status: "Returned",
    items: 1,
    total: 1299,
    tracking: "TRK-987656",
    deliveryDate: "2023-10-30",
  },
]

const statusIcons = {
  Delivered: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  Shipped: <Truck className="h-4 w-4 text-blue-500" />,
  Processing: <Clock className="h-4 w-4 text-amber-500" />,
  Cancelled: <XCircle className="h-4 w-4 text-red-500" />,
  Returned: <Package className="h-4 w-4 text-purple-500" />,
}

export function OrdersPage() {
  return (
    <div className="grid gap-4 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Last 30 days <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Last 30 days
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Last 3 months</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Last 6 months</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Last year</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Order Status Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        { [
          { label: "Delivered", icon: <CheckCircle2 className="h-6 w-6 text-green-500" />, count: orders.filter(o => o.status === "Delivered").length },
          { label: "Shipped", icon: <Truck className="h-6 w-6 text-blue-500" />, count: orders.filter(o => o.status === "Shipped").length },
          { label: "Processing", icon: <Clock className="h-6 w-6 text-amber-500" />, count: orders.filter(o => o.status === "Processing").length },
          { label: "Cancelled", icon: <XCircle className="h-6 w-6 text-red-500" />, count: orders.filter(o => o.status === "Cancelled").length },
        ].map((status) => (
          <Card key={status.label} className="flex flex-row items-center gap-4 p-4">
            <div>{status.icon}</div>
            <div>
              <div className="text-lg font-semibold">{status.count}</div>
              <div className="text-sm text-muted-foreground">{status.label}</div>
            </div>
          </Card>
        )) }
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8 w-full"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Status <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Processing</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Shipped</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Delivered</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Cancelled</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Returned</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Orders Table */}
      <Card className="overflow-x-auto">
        <Table className="min-w-[600px] md:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total (₹)</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {statusIcons[order.status as keyof typeof statusIcons]}
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </div>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell>{order.tracking ? order.tracking : <span className="text-muted-foreground">—</span>}</TableCell>
                <TableCell>{order.deliveryDate ? order.deliveryDate : <span className="text-muted-foreground">—</span>}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Track Order</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-end py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button variant="outline" size="sm" disabled>
                <span className="sr-only">Previous</span>
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
            </PaginationItem>
            <PaginationItem className="hidden sm:inline-flex">
              <Button variant="outline" size="sm">
                1
              </Button>
            </PaginationItem>
            <PaginationItem className="hidden sm:inline-flex">
              <Button variant="outline" size="sm">
                2
              </Button>
            </PaginationItem>
            <PaginationItem className="hidden sm:inline-flex">
              <Button variant="outline" size="sm">
                3
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button variant="outline" size="sm">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Delivered":
      return "default"
    case "Shipped":
      return "secondary"
    case "Processing":
      return "outline"
    case "Cancelled":
      return "destructive"
    case "Returned":
      return "outline"
    default:
      return "outline"
  }
}