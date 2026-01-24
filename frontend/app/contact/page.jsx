// frontend/app/contact/page.jsx
"use client";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import { services } from "@/app/services/services";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Contact = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang];
  const services = t.services.list;
  const isRTL = lang === "he";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="h-screen flex items-center py-24 xl:py-0"
    >
      <div className="container mx-auto w-full h-full flex flex-col items-center xl:justify-center xl:overflow-hidden scrollbar scrollbar-thumb-accent scrollbar-track-accent/5 overflow-y-scroll xl:overflow-y-visible">
        <div className="w-full">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* info text */}
            <div className="flex-1 xl:w-[600px] flex flex-col gap-12">
              <div>
                <h2 className="h2 mb-6">
                  {t.contact.title.normal}{" "}
                  <span className="text-accent">{t.contact.title.accent}</span>
                </h2>
                <p className="max-w-[460px]">{t.contact.description}</p>
              </div>
            </div>
            {/* form */}
            <div className="flex-1">
              <form className="flex flex-col gap-6 items-start">
                {/* first and last name */}
                <div className="flex flex-col xl:flex-row gap-6 w-full">
                  <div className="w-full">
                    <Label htmlFor="firstname">
                      {t.contact.fields.firstname}{" "}
                      <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      placeholder={t.contact.fields.firstname}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="lastname">
                      {t.contact.fields.lastname}{" "}
                      <span className="text-accent">*</span>
                    </Label>

                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder={t.contact.fields.lastname}
                      required
                    />
                  </div>
                </div>
                {/* email */}
                <div className="w-full">
                  <Label htmlFor="email">
                    {t.contact.fields.email}{" "}
                    <span className="text-accent">*</span>
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    placeholder="youremail@gmail.com"
                    required
                  />
                </div>
                {/* select */}
                <div className="w-full">
                  <Label htmlFor="service">
                    {t.contact.fields.service}{" "}
                    <span className="text-accent">*</span>
                  </Label>

                  <Select name="service" required dir={isRTL ? "rtl" : "ltr"}>
                    <SelectTrigger
                      id="service"
                      className={`w-full h-12 bg-white/10 border border-white/10 px-4 focus-visible:border-accent focus-visible:ring-accent focus-visible:ring-[1px] ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <SelectValue
                        placeholder={t.contact.fields.servicePlaceholder}
                      />
                    </SelectTrigger>

                    <SelectContent className="bg-black border-white/20">
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* textarea */}
                <div className="w-full">
                  <Label htmlFor="message">
                    {t.contact.fields.message}{" "}
                    <span className="text-accent">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t.contact.fields.message}
                    className="min-h-[160px] bg-white/10 border-white/10 focus-visible:border-accent focus-visible:ring-accent focus-visible:ring-[1px] resize-none p-4 placeholder:text-white/50"
                    required
                  />
                </div>
                {/* btn */}
                <button className="btn btn-lg btn-accent">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{t.contact.sendBtn}</span>

                    <HiOutlineArrowLongRight
                      className={`text-xl transition-transform ${
                        lang === "he" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
