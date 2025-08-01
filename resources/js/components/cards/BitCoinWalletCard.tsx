// project-imports
import MainCard from '@/components/MainCard';

interface BitCoinWalletCardProps {
  title: string;
  amount: string;
  description: string;
  iconClass: string;
  bgClass?: string;
}

// ==============================|| BITCOIN WALLET CARD ||============================== //

export default function BitCoinWalletCard({ title, amount, description, iconClass, bgClass }: BitCoinWalletCardProps) {
  return (
    <MainCard className={`bitcoin-wallet ${bgClass}`}>
      <h5 className="text-white mb-2">{title}</h5>
      <h2 className="text-white mb-2 f-w-300">${amount}</h2>
      <span className="text-white d-block">{description}</span>
      <i className={`${iconClass} f-70 text-white`} />
    </MainCard>
  );
}
