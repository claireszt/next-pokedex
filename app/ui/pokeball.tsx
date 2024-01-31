import Image from 'next/image';

export default function PokeballLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white justify-center"> {/* Utilisez la classe justify-center pour le centrage horizontal */}
      <Image src="/pokeball.png" alt="Logo" width={100} height={100} priority={true} />
    </div>
  );
}
