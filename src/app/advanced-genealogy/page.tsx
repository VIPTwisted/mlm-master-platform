import AdvancedGenealogyTree from '@/components/AdvancedGenealogyTree';
import GenealogyReports from '@/components/GenealogyReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TreePine, FileBarChart } from 'lucide-react';

export default function AdvancedGenealogyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Advanced Genealogy System</h1>
          <p className="text-gray-600">Interactive D3.js visualization and comprehensive reporting</p>
        </div>

        <Tabs defaultValue="tree" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tree" className="flex items-center">
              <TreePine className="h-4 w-4 mr-2" />
              D3.js Tree Visualization
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileBarChart className="h-4 w-4 mr-2" />
              Genealogy Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tree">
            <AdvancedGenealogyTree />
          </TabsContent>

          <TabsContent value="reports">
            <GenealogyReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
