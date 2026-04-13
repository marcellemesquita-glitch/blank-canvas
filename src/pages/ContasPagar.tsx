import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Conta {
  id: number;
  fornecedor: string;
  valor: string;
  vencimento: string;
  status: "pago" | "pendente" | "atrasado";
}

const initialContas: Conta[] = [
  { id: 1, fornecedor: "Fornecedor ABC Ltda", valor: "R$ 12.500,00", vencimento: "15/06/2026", status: "pendente" },
  { id: 2, fornecedor: "Distribuidora Norte", valor: "R$ 8.300,00", vencimento: "10/06/2026", status: "atrasado" },
  { id: 3, fornecedor: "Logística Express", valor: "R$ 5.200,00", vencimento: "20/06/2026", status: "pendente" },
  { id: 4, fornecedor: "Embalagens Sul", valor: "R$ 3.800,00", vencimento: "05/06/2026", status: "pago" },
  { id: 5, fornecedor: "Matéria Prima Co.", valor: "R$ 15.430,00", vencimento: "25/06/2026", status: "pendente" },
  { id: 6, fornecedor: "Energia Elétrica", valor: "R$ 4.200,00", vencimento: "01/06/2026", status: "pago" },
  { id: 7, fornecedor: "Telecom Solutions", valor: "R$ 1.890,00", vencimento: "08/06/2026", status: "pago" },
];

const statusConfig = {
  pago: { label: "Pago", variant: "default" as const, className: "bg-success text-success-foreground hover:bg-success/80" },
  pendente: { label: "Pendente", variant: "secondary" as const, className: "bg-warning text-warning-foreground hover:bg-warning/80" },
  atrasado: { label: "Atrasado", variant: "destructive" as const, className: "" },
};

const ContasPagar = () => {
  const [contas, setContas] = useState(initialContas);
  const [open, setOpen] = useState(false);

  const totalPagar = contas.filter((c) => c.status !== "pago").length;
  const totalAtrasado = contas.filter((c) => c.status === "atrasado").length;

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nova: Conta = {
      id: contas.length + 1,
      fornecedor: form.get("fornecedor") as string,
      valor: `R$ ${form.get("valor")}`,
      vencimento: form.get("vencimento") as string,
      status: (form.get("status") as Conta["status"]) || "pendente",
    };
    setContas([...contas, nova]);
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">Contas a Pagar</h1>
            <p className="text-muted-foreground">Gerencie suas contas e fornecedores</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Conta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Conta</DialogTitle>
                <DialogDescription>Preencha os dados da nova conta a pagar</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fornecedor">Fornecedor</Label>
                  <Input id="fornecedor" name="fornecedor" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input id="valor" name="valor" placeholder="10.000,00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vencimento">Vencimento</Label>
                  <Input id="vencimento" name="vencimento" placeholder="DD/MM/AAAA" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="pendente">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                      <SelectItem value="atrasado">Atrasado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Contas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold">{contas.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-warning">{totalPagar}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Atrasadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-destructive">{totalAtrasado}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contas.map((conta) => {
                  const cfg = statusConfig[conta.status];
                  return (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.fornecedor}</TableCell>
                      <TableCell>{conta.valor}</TableCell>
                      <TableCell>{conta.vencimento}</TableCell>
                      <TableCell>
                        <Badge variant={cfg.variant} className={cfg.className}>
                          {cfg.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContasPagar;
