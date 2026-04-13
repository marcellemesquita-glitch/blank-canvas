import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign } from "lucide-react";

const funcionarios = [
  { id: 1, nome: "Ana Silva", cargo: "Gerente Financeiro", salario: "R$ 12.500,00", status: "ativo" },
  { id: 2, nome: "Carlos Santos", cargo: "Analista de Compras", salario: "R$ 6.800,00", status: "ativo" },
  { id: 3, nome: "Maria Oliveira", cargo: "Assistente Administrativo", salario: "R$ 3.500,00", status: "ativo" },
  { id: 4, nome: "João Pereira", cargo: "Motorista", salario: "R$ 4.200,00", status: "ativo" },
  { id: 5, nome: "Fernanda Costa", cargo: "Supervisora de Produção", salario: "R$ 8.900,00", status: "ativo" },
  { id: 6, nome: "Ricardo Lima", cargo: "Vendedor", salario: "R$ 5.100,00", status: "férias" },
  { id: 7, nome: "Patrícia Alves", cargo: "RH", salario: "R$ 7.200,00", status: "ativo" },
  { id: 8, nome: "Lucas Mendes", cargo: "Operador de Empilhadeira", salario: "R$ 3.800,00", status: "afastado" },
];

const FolhaPagamento = () => {
  const totalFolha = 128500;
  const ativos = funcionarios.filter((f) => f.status === "ativo").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Folha de Pagamento</h1>
          <p className="text-muted-foreground">Gestão de funcionários e salários</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total da Folha</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold">R$ {totalFolha.toLocaleString("pt-BR")},00</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Funcionários</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold">{funcionarios.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-success">{ativos}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Salário</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {funcionarios.map((func) => (
                  <TableRow key={func.id}>
                    <TableCell className="font-medium">{func.nome}</TableCell>
                    <TableCell>{func.cargo}</TableCell>
                    <TableCell>{func.salario}</TableCell>
                    <TableCell>
                      <Badge
                        variant={func.status === "ativo" ? "default" : "secondary"}
                        className={
                          func.status === "ativo"
                            ? "bg-success text-success-foreground hover:bg-success/80"
                            : func.status === "férias"
                            ? "bg-warning text-warning-foreground hover:bg-warning/80"
                            : ""
                        }
                      >
                        {func.status.charAt(0).toUpperCase() + func.status.slice(1)}
                      </Badge>
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

export default FolhaPagamento;
