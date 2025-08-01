import { Card, CardContent } from "@bytebank-web/ui/card";
import { Account } from "@bytebank-web/types/account";
import { TransactionForm } from "@bytebank-web/ui/transactionForm";
import { Loading } from "@bytebank-web/ui/loading";

interface AccountBalanceProps {
  account: Account | undefined;
  isLoading: boolean;
}

export const AccountBalance = ({ account, isLoading }: AccountBalanceProps) => {
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
          {isLoading ? (
            <Loading aria-label="Carregando informações do saldo" />
          ) : (
            <>
              <div className="flex justify-between text-lg gap-8">
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
              </div>
              <div className="flex gap-2">
                <TransactionForm aria-label="Formulário de Transações" />
              </div>
            </>
          )}
        </section>
      </CardContent>
    </Card>
  );
};
