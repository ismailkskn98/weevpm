"use client";;
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden lg:flex lg:flex-col bg-neutral-100 w-[270px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "270px" : "60px") : "270px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}>
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();
  const { userData } = useAuth();

  return (
    <>
      <div
        className={cn(
          "h-16 px-4 py-1.5 flex flex-row lg:hidden items-center justify-between bg-gradient-to-br from-slate-50 to-slate-50 w-full"
        )}
        {...props}>
        <div className="flex items-center gap-2">
          <Link href="/user">
            <Image src="/images/logos/yellow_single_icon.png" alt="weecoins premium logo" width={50} height={50} className="w-full h-11 object-contain object-center" />
          </Link>
          <span className="text-sm font-medium text-deep-teal capitalize">{userData?.user?.user_name}</span>
        </div>
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800"
            onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white p-10 z-[100] flex flex-col justify-between",
                className
              )}>
              <div
                className="absolute right-10 top-12 z-50 text-white/90 cursor-pointer"
                onClick={() => setOpen(!open)}>
                <IconX />
              </div>
              <section className="w-full h-full flex flex-col items-start gap-16">
                {children}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  spanClassName,
  ...props
}) => {
  const { open, animate, setOpen } = useSidebar();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  return (
    <Link
      href={link.href}
      className={cn("flex items-center justify-start gap-2 group/sidebar py-3.5 lg:py-2", className)}
      onClick={handleLinkClick}
      {...props}>
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn("text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0", spanClassName)}>
        {link.label}
      </motion.span>
    </Link>
  );
};
