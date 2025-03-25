"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FloatingObject = () => {
  return (
    <Link href="#sponsor-section" >
      <motion.div
        className="absolute top-10 right-10 md:right-20 p-3 cursor-pointer"
        animate={{
          y: [0, -20, 0], // Moves up and down
          rotate: [0, 5, -6, 0], // Slight rotation
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/assets/images/heat.png"
          alt="Floating Icon"
          width={85}
          height={75}
        />
      </motion.div>
    </Link>
  );
};

export default FloatingObject;
