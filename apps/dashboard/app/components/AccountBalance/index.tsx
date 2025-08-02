import { Card, CardContent } from "@bytebank-web/ui/card";
import { TransactionForm } from "@bytebank-web/ui/transactionForm";
import { Loading } from "@bytebank-web/ui/loading";
import { MonthYearPicker } from "@bytebank-web/ui/monthYearPicker";
import { useBalance } from "@/hooks/useBalance";

interface AccountBalanceProps {
  ownerEmail: string | null; 
  month: number;
  year: number;
  onMonthChange: (selectedMonth: number, selectedYear: number) => void;
}
export const AccountBalance = ({ ownerEmail, month, year, onMonthChange }: AccountBalanceProps) => {
  const { account, isLoadingAccount } = useBalance(ownerEmail, month, year);

  return (
    <Card className="col-span-4">
      <CardContent>
        <section
          className="flex md:flex-row md:items-center md:justify-between mb-2 gap-2"
          aria-labelledby="account-balance-section-title"
        >
          <h2 id="account-balance-section-title" className="sr-only">
            Informações do Saldo da Conta
          </h2>
          <div className="flex justify-between items-center text-lg gap-11">
            <div className="flex gap-5">
              <h3 className="font-semibold" id="account-balance-title">
                Balanço mensal
              </h3>
              <MonthYearPicker onChange={onMonthChange} />
            </div>
            {isLoadingAccount ? (
              <Loading aria-label="Carregando informações do saldo" />
            ) : (
              <>
                <div className="grid font-semibold">
                  <span
                    id="account-balance-title"
                    className="text-sm text-gray-500"
                  >
                    Saldo
                  </span>
                  <span aria-live="polite" aria-atomic="true">
                    R$ {account?.balance.toLocaleString()}
                  </span>
                </div>
                <div className="grid font-semibold">
                  <span className="text-sm text-gray-500">Receita</span>
                  <span aria-live="polite" aria-atomic="true">
                    R$ {account?.income.toLocaleString()}
                  </span>
                </div>
                <div className="grid font-semibold">
                  <span className="text-sm text-gray-500">Despesas</span>
                  <span aria-live="polite" aria-atomic="true">
                    R$ {account?.expense.toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <TransactionForm aria-label="Formulário de Transações" />
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
