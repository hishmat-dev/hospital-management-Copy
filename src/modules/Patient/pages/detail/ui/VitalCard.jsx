export default function VitalCard  ({ metric, value, unit, secondaryValue, secondaryUnit, icon: Icon, colorScheme })  {
  const bgColor = `bg-${colorScheme}-50`;
  const iconColor = `text-${colorScheme}-600`;
  const titleColor = `text-${colorScheme}-900`;
  const valueColor = `text-${colorScheme}-800`;
  const secondaryColor = `text-${colorScheme}-600`;

  return (
    <div className={`${bgColor} rounded-lg p-3`}>
      <div className="flex items-center space-x-2 mb-1">
        <Icon size={16} className={iconColor} />
        <span className={`font-medium ${titleColor}`}>{metric}</span>
      </div>
      <p className={`font-bold ${valueColor}`}>
        {value}
        {unit && unit}
      </p>
      {secondaryValue && (
        <p className={secondaryColor}>
          {secondaryValue} {secondaryUnit}
        </p>
      )}
    </div>
  );
};