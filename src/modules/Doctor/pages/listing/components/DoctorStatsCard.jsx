import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../components/ui/card'; 

const DoctorStatsCard = ({ title, value, textColor }) => {
  return (
    <Card className="bg-white shadow-md h-12">
      <div className="flex items-center justify-between p-2 h-12">
        <div className="flex-1">
          <CardHeader>
            <CardTitle className="font-medium">{title}</CardTitle>
          </CardHeader>
        </div>
        <div className="flex-1 text-right">
          <CardContent>
            <div className={`font-bold ${textColor || ''}`}>{value}</div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default DoctorStatsCard;