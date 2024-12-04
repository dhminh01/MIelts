export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main>
      <div>
        <h1>Thank for your payment!</h1>
        <h2>You successfully sent</h2>
        <div>${amount}</div>
      </div>
    </main>
  );
}
