import { links, stats } from "../../exports";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const HeaderStats = () => {
  return (
    <div>
      <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="group">
              {link.name}{" "}
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 inline motion-reduce:transition ease-out delay-100 duration-300 group-hover:translate-x-0.5 group-active/edit:translate-x-2"
              />
            </a>
          ))}
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
