

import { Card, CardContent } from "../../../../../components/ui/card"
import { Button } from "../../../../../components/ui/button"
import { Badge } from "../../../../../components/ui/badge"
import { Eye, Edit, Trash2, Phone, Mail, Calendar } from "lucide-react"

export default function ListItem({ doctor, onView, onEdit, onDelete, getSpecialtyColor, getStatusColor }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold ">{doctor.name?.charAt(0) || "D"}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold ">{doctor.name}</h3>
                <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                <Badge variant="outline" className={getSpecialtyColor(doctor.specialty)}>
                  {doctor.specialty}
                </Badge>
              </div>
              <div className="flex items-center gap-4  text-gray-600">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {doctor.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {doctor.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {doctor.experience} years exp.
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onView(doctor)}>
              <Eye className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEdit(doctor)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(doctor.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
