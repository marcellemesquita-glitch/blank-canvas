import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileText, Users, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const summaryCards = [
  { title: "Total a Pagar", value: "R$ 45.230,00", icon: FileText, change: "+12%", color: "text-destructive" },
  { title: "Folha Mensal", value: "R$ 128.500,00", icon: Users, change: "+3%", color: "text-primary" },
  { title: "Entradas", value: "R$ 312.800,00", icon: TrendingUp, change: "+18%", color: "text-success" },
  { title: "Saídas", value: "R$ 198.450,00", icon: TrendingDown, change: "-5%", color: "text-warning" },
];

const cashFlowData = [
  { mes: "Jan", entradas: 280000, saidas: 195000 },
  { mes: "Fev", entradas: 305000, saidas: 210000 },
  { mes: "Mar", entradas: 290000, saidas: 185000 },
  { mes: "Abr", entradas: 320000, saidas: 200000 },
  { mes: "Mai", entradas: 310000, saidas: 190000 },
  { mes: "Jun", entradas: 312800, saidas: 198450 },
];

const recentTransactions = [
  { desc: "Fornecedor ABC Ltda", valor: "- R$ 12.500,00", tipo: "saida", data: "10/06/2026" },
  { desc: "Cliente XYZ Corp", valor: "+ R$ 45.000,00", tipo: "entrada", data: "09/06/2026" },
  { desc: "Aluguel Escritório", valor: "- R$ 8.200,00", tipo: "saida", data: "08/06/2026" },
  { desc: "Venda Produto A", valor: "+ R$ 23.100,00", tipo: "entrada", data: "07/06/2026" },
  { desc: "Internet / Telecom", valor: "- R$ 1.890,00", tipo: "saida", data: "06/06/2026" },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral das finanças</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold">{card.value}</div>
                <p className={`text-xs ${card.color} mt-1`}>{card.change} em relação ao mês anterior</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-heading">Fluxo de Caixa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
                  <Line type="monotone" dataKey="entradas" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="saidas" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{tx.desc}</p>
                      <p className="text-xs text-muted-foreground">{tx.data}</p>
                    </div>
                    <span className={`text-sm font-semibold ${tx.tipo === "entrada" ? "text-success" : "text-destructive"}`}>
                      {tx.valor}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
