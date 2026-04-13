import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyData = [
  { mes: "Jan", entradas: 280000, saidas: 195000 },
  { mes: "Fev", entradas: 305000, saidas: 210000 },
  { mes: "Mar", entradas: 290000, saidas: 185000 },
  { mes: "Abr", entradas: 320000, saidas: 200000 },
  { mes: "Mai", entradas: 310000, saidas: 190000 },
  { mes: "Jun", entradas: 312800, saidas: 198450 },
];

const transactions = [
  { id: 1, desc: "Venda Produto Premium", valor: 45000, tipo: "entrada" as const, data: "10/06/2026", categoria: "Vendas" },
  { id: 2, desc: "Fornecedor ABC Ltda", valor: 12500, tipo: "saida" as const, data: "10/06/2026", categoria: "Fornecedores" },
  { id: 3, desc: "Consultoria Projeto X", valor: 23100, tipo: "entrada" as const, data: "09/06/2026", categoria: "Serviços" },
  { id: 4, desc: "Aluguel Escritório", valor: 8200, tipo: "saida" as const, data: "08/06/2026", categoria: "Fixas" },
  { id: 5, desc: "Venda E-commerce", valor: 18700, tipo: "entrada" as const, data: "07/06/2026", categoria: "Vendas" },
  { id: 6, desc: "Folha de Pagamento", valor: 128500, tipo: "saida" as const, data: "05/06/2026", categoria: "RH" },
  { id: 7, desc: "Rendimento Aplicação", valor: 3200, tipo: "entrada" as const, data: "04/06/2026", categoria: "Investimentos" },
  { id: 8, desc: "Internet / Telecom", valor: 1890, tipo: "saida" as const, data: "03/06/2026", categoria: "Fixas" },
];

const FluxoCaixa = () => {
  const [filter, setFilter] = useState<"todos" | "entrada" | "saida">("todos");

  const totalEntradas = 312800;
  const totalSaidas = 198450;
  const saldo = totalEntradas - totalSaidas;

  const filtered = filter === "todos" ? transactions : transactions.filter((t) => t.tipo === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Fluxo de Caixa</h1>
          <p className="text-muted-foreground">Acompanhe entradas e saídas</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Entradas</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-success">
                R$ {totalEntradas.toLocaleString("pt-BR")},00
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saídas</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-destructive">
                R$ {totalSaidas.toLocaleString("pt-BR")},00
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saldo</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-primary">
                R$ {saldo.toLocaleString("pt-BR")},00
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Entradas vs Saídas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mes" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
                <Legend />
                <Bar dataKey="entradas" name="Entradas" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saidas" name="Saídas" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading">Transações</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant={filter === "todos" ? "default" : "outline"} onClick={() => setFilter("todos")}>
                  Todos
                </Button>
                <Button size="sm" variant={filter === "entrada" ? "default" : "outline"} onClick={() => setFilter("entrada")}>
                  Entradas
                </Button>
                <Button size="sm" variant={filter === "saida" ? "default" : "outline"} onClick={() => setFilter("saida")}>
                  Saídas
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.desc}</TableCell>
                    <TableCell>{tx.categoria}</TableCell>
                    <TableCell>{tx.data}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          tx.tipo === "entrada"
                            ? "bg-success text-success-foreground hover:bg-success/80"
                            : "bg-destructive text-destructive-foreground hover:bg-destructive/80"
                        }
                      >
                        {tx.tipo === "entrada" ? "Entrada" : "Saída"}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${tx.tipo === "entrada" ? "text-success" : "text-destructive"}`}>
                      {tx.tipo === "entrada" ? "+" : "-"} R$ {tx.valor.toLocaleString("pt-BR")},00
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FluxoCaixa;
