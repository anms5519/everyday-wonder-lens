
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WonderEntry } from './WonderCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, startOfWeek, addDays } from 'date-fns';

interface WeeklyInsightsProps {
  entries: WonderEntry[];
}

const WeeklyInsights: React.FC<WeeklyInsightsProps> = ({ entries }) => {
  // Function to generate data for the last 7 days
  const generateChartData = () => {
    const startDate = startOfWeek(new Date());
    
    const weekData = Array.from({ length: 7 }).map((_, index) => {
      const day = addDays(startDate, index);
      const dayFormatted = format(day, 'EEE');
      const count = entries.filter(
        entry => format(entry.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      ).length;
      
      return {
        day: dayFormatted,
        count,
      };
    });
    
    return weekData;
  };
  
  // Get the most common themes from reflections (simplified)
  const getCommonThemes = () => {
    const themes = ['nature', 'light', 'color', 'texture', 'people'];
    return themes.sort(() => 0.5 - Math.random()).slice(0, 3);
  };
  
  const chartData = generateChartData();
  const themes = getCommonThemes();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Your Weekly Wonder Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={30}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#0ea5e9" 
                strokeWidth={2} 
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Common Themes in Your Reflections</h4>
          <div className="flex flex-wrap gap-2">
            {themes.map(theme => (
              <span 
                key={theme} 
                className="bg-muted px-3 py-1 rounded-full text-xs"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">This Week</h4>
          <p className="text-sm text-muted-foreground">
            You've captured {entries.length} moments of wonder this week.
            {entries.length > 5 
              ? " You're on a wonderful streak!" 
              : " Keep capturing to build your wonder practice."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyInsights;
