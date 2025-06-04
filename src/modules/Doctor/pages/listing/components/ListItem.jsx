import { Card, CardContent } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";
import { Eye, Edit, Trash2, Phone, Mail, Calendar } from "lucide-react";

export default function ListItem({ doctor, onView, onEdit, onDelete, getSpecialtyColor, getStatusColor }) {
  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col h-full">
      <CardContent className="p-4 flex flex-col flex-1 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-semibold">{doctor.name?.charAt(4) || "D"}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg truncate">{doctor.name}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
              <Badge variant="outline" className={getSpecialtyColor(doctor.specialty)}>
                {doctor.specialty}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex-1  text-gray-600 space-y-2">
          <div className="flex items-center gap-1 truncate">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span>{doctor.email}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{doctor.experience} years exp.</span>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
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
      </CardContent>
    </Card>
  );
}