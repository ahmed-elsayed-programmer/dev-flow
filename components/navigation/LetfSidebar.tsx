import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import NavLinks from "./navbar/NavLinks";

const LeftSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6  ">
        <NavLinks isMobileNav={false} />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
        >
          <Link href={ROUTES.SIGN_IN}>
            <Image
              src="/icons/account.svg"
              width={20}
              height={20}
              alt="Account logo"
              className="invert-colors lg:hidden"
            />
            <span className="primary-text-gradient max-lg:hidden">Log in</span>
          </Link>
        </Button>

        <Button
          asChild
          className="small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
        >
          <Link href={ROUTES.SIGN_UP}>
            <Image
              src="/icons/sign-up.svg"
              width={20}
              height={20}
              alt="Account logo"
              className="invert-colors lg:hidden"
            />
            <span className="max-lg:hidden">Sign-up</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LeftSidebar;
