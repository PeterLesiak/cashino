'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import * as motion from 'motion/react-client';
import {
  BadgeDollarSignIcon,
  BookUpIcon,
  ChartCandlestickIcon,
  ChevronUpIcon,
  ClapperboardIcon,
  CloverIcon,
  DicesIcon,
  FerrisWheelIcon,
  FlameIcon,
  Gamepad2Icon,
  GemIcon,
  GripIcon,
  HandCoinsIcon,
  PanelLeftCloseIcon,
  SpadeIcon,
  SquareAsteriskIcon,
  StarIcon,
  UserIcon,
  WalletMinimalIcon,
} from 'lucide-react';

type SidebarItem = { href: string; text: string; icon: ReactNode };
type SidebarFolder = { text: string; icon: ReactNode; items: SidebarItem[] };

const sidebarItems: (SidebarFolder | SidebarItem[])[] = [
  {
    text: 'Casino',
    icon: <DicesIcon />,
    items: [
      { href: '/', text: 'Favourites', icon: <StarIcon /> },
      { href: '/', text: 'New Release', icon: <FlameIcon /> },
      { href: '/', text: 'Originals', icon: <GemIcon /> },
    ],
  },
  [
    { href: '/', text: 'All Games', icon: <GripIcon /> },
    { href: '/', text: 'Bonus', icon: <BadgeDollarSignIcon /> },
    { href: '/', text: 'Slots', icon: <SpadeIcon /> },
    { href: '/', text: 'Live Casino', icon: <ClapperboardIcon /> },
    { href: '/', text: 'Feature Buy', icon: <ChartCandlestickIcon /> },
    { href: '/', text: 'Casual Games', icon: <Gamepad2Icon /> },
    { href: '/', text: 'Roulette', icon: <FerrisWheelIcon /> },
    { href: '/', text: 'RNG Games', icon: <CloverIcon /> },
    { href: '/', text: 'Cards', icon: <SquareAsteriskIcon /> },
  ],
  {
    text: 'Account',
    icon: <UserIcon />,
    items: [
      { href: '/', text: 'My Wallet', icon: <WalletMinimalIcon /> },
      { href: '/', text: 'Log out', icon: <BookUpIcon /> },
      { href: '/', text: 'Withdraw', icon: <HandCoinsIcon /> },
    ],
  },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [itemsOpened, setItemsOpened] = useState<boolean[]>(sidebarItems.map(() => true));

  return (
    <motion.nav
      layout
      className="flex h-max min-h-full flex-col items-center gap-4 border-r-2 border-neutral-600 bg-neutral-700 p-6 text-sm font-medium text-white"
    >
      {sidebarItems.map((folderOrArray, index) => (
        <motion.div
          layout="position"
          className={`${sidebarOpen ? 'w-48' : ''} flex flex-col gap-2`}
          key={index}
        >
          {'items' in folderOrArray ? (
            <button
              className={`${!sidebarOpen ? 'aspect-square' : ''} flex h-[34px] cursor-pointer items-center gap-2 rounded-md bg-red-400 p-2 transition hover:bg-red-500`}
              onClick={() =>
                setItemsOpened(
                  itemsOpened.map((opened, openedIndex) =>
                    index == openedIndex ? !opened : opened,
                  ),
                )
              }
            >
              <div className="*:size-[18px]">{folderOrArray.icon}</div>
              <div
                className={`${!sidebarOpen ? 'hidden' : ''} flex w-full items-center gap-2`}
              >
                <span className="h-3 w-[2px] bg-white opacity-50"></span>
                <span>{folderOrArray.text}</span>
                <ChevronUpIcon
                  size={20}
                  className={`${!itemsOpened[index] ? 'rotate-180' : ''} ml-auto transition duration-300`}
                />
              </div>
            </button>
          ) : null}

          <motion.div layout className="flex flex-col gap-2">
            {itemsOpened[index]
              ? (Array.isArray(folderOrArray) ? folderOrArray : folderOrArray.items).map(
                  (item, index) => (
                    <Link
                      href={item.href}
                      className={`${!sidebarOpen ? 'aspect-square' : ''} flex h-[34px] cursor-pointer items-center gap-2 rounded-md p-2 transition hover:bg-neutral-600`}
                      key={index}
                    >
                      <motion.div layout className="*:size-[18px]">
                        {item.icon}
                      </motion.div>
                      <div
                        className={`${!sidebarOpen ? 'hidden' : ''} flex w-full items-center gap-2`}
                      >
                        <span className="h-3 w-[2px] bg-white opacity-50"></span>
                        <span>{item.text}</span>
                      </div>
                    </Link>
                  ),
                )
              : null}
          </motion.div>

          <motion.div className="mt-2 h-[2px] w-full bg-neutral-600"></motion.div>
        </motion.div>
      ))}
      <motion.div
        layout="position"
        className={`${sidebarOpen ? 'w-48' : ''} flex flex-col gap-2`}
      >
        <button
          className={`${!sidebarOpen ? 'aspect-square' : ''} flex h-[34px] cursor-pointer items-center gap-2 rounded-md p-2 transition hover:bg-neutral-600`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <motion.div layout className="*:size-[18px]">
            <PanelLeftCloseIcon
              className={`${!sidebarOpen ? 'rotate-180' : ''} rotate-0 transition duration-300`}
            />
          </motion.div>
          <div className={`${!sidebarOpen ? 'hidden' : ''} flex w-full items-center gap-2`}>
            <span className="h-3 w-[2px] bg-white opacity-50"></span>
            <span>Hide sidebar</span>
          </div>
        </button>
      </motion.div>
    </motion.nav>
  );
}
