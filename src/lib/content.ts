export const broker = {
  name: "Rafael Couto",
  role: "Corretor de imóveis",
  creci: "CRECI 12.345-GO",
  years: 8,
  families: 150,
  city: "Caldas Novas",
  region: "Caldas Novas e região",
  headline: "Encontre o imóvel que combina com a vida que você quer viver.",
  tagline: "Curadoria de imóveis de alto padrão em Caldas Novas e região.",
  bio: "Há 8 anos ajudando famílias a encontrar não só um imóvel, mas o lugar certo pra próxima fase da vida. Atendimento próximo, sem pressa e sem pressão — porque decisão de imóvel não se toma com pressa.",
  phoneDisplay: "(62) 99999-0000",
  phoneHref: "tel:+5562999990000",
  instagram: "@rafaelcouto.imoveis",
  instagramHref: "https://instagram.com/rafaelcouto.imoveis",
  portrait: "/images/rafael-portrait.png",
  whatsapp: {
    number: "5562999990000",
    display: "(62) 99999-0000",
  },
};

export function waLink(message: string) {
  return `https://wa.me/${broker.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const generalWhatsApp = waLink(
  "Olá Rafael, vim pelo site. Quero conversar sobre um imóvel em Caldas Novas e região.",
);

export const contactWhatsApp = waLink(
  "Olá Rafael, quero conversar sobre o meu próximo imóvel.",
);

export const sections = [
  { id: "hero", label: "Início", start: 0, end: 0.14 },
  { id: "sobre", label: "Sobre", start: 0.14, end: 0.28 },
  { id: "imoveis", label: "Imóveis", start: 0.28, end: 0.5 },
  { id: "processo", label: "Processo", start: 0.5, end: 0.64 },
  { id: "depoimentos", label: "Clientes", start: 0.64, end: 0.76 },
  { id: "localizacao", label: "Região", start: 0.76, end: 0.88 },
  { id: "contato", label: "Contato", start: 0.88, end: 1 },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const stats = [
  { value: "8 anos", label: "de mercado" },
  { value: "+150", label: "famílias atendidas" },
  { value: "CRECI", label: "ativo em Goiás" },
];

export const properties = [
  {
    id: "casa-jardim-primavera",
    name: "Casa Jardim Primavera",
    location: "Jardim Primavera, Caldas Novas",
    area: "280 m²",
    beds: "4 suítes",
    price: "R$ 890 mil",
    image: "/images/imovel-primavera.png",
    interestMessage:
      "Olá Rafael, tenho interesse na Casa Jardim Primavera (280 m², R$ 890 mil). Vi pelo site e gostaria de saber mais.",
  },
  {
    id: "cobertura-parque-flores",
    name: "Cobertura Parque das Flores",
    location: "Parque das Flores, Caldas Novas",
    area: "186 m²",
    beds: "3 suítes",
    price: "R$ 1,15 mi",
    image: "/images/imovel-flores.png",
    interestMessage:
      "Olá Rafael, tenho interesse na Cobertura Parque das Flores (186 m², R$ 1,15 mi). Vi pelo site e gostaria de saber mais.",
  },
  {
    id: "sobrado-eldorado",
    name: "Sobrado Residencial Eldorado",
    location: "Residencial Eldorado, Caldas Novas",
    area: "320 m²",
    beds: "5 quartos",
    price: "R$ 1,38 mi",
    image: "/images/imovel-eldorado.png",
    interestMessage:
      "Olá Rafael, tenho interesse no Sobrado Residencial Eldorado (320 m², R$ 1,38 mi). Vi pelo site e gostaria de saber mais.",
  },
  {
    id: "apto-village-garden",
    name: "Apartamento Village Garden",
    location: "Village Garden, Caldas Novas",
    area: "124 m²",
    beds: "3 quartos",
    price: "R$ 620 mil",
    image: "/images/imovel-village.png",
    interestMessage:
      "Olá Rafael, tenho interesse no Apartamento Village Garden (124 m², R$ 620 mil). Vi pelo site e gostaria de saber mais.",
  },
  {
    id: "casa-orquideas",
    name: "Casa Condomínio Orquídeas",
    location: "Condomínio Orquídeas, Caldas Novas",
    area: "240 m²",
    beds: "4 quartos",
    price: "R$ 975 mil",
    image: "/images/imovel-orquideas.png",
    interestMessage:
      "Olá Rafael, tenho interesse na Casa Condomínio Orquídeas (240 m², R$ 975 mil). Vi pelo site e gostaria de saber mais.",
  },
  {
    id: "loft-centro",
    name: "Loft Centro",
    location: "Centro, Caldas Novas",
    area: "98 m²",
    beds: "2 quartos",
    price: "R$ 485 mil",
    image: "/images/imovel-centro.png",
    interestMessage:
      "Olá Rafael, tenho interesse no Loft Centro (98 m², R$ 485 mil). Vi pelo site e gostaria de saber mais.",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Conversamos sobre o que você procura",
    text: "Rotina, família, investimento, prazo. Eu escuto primeiro — depois filtro o que realmente faz sentido.",
  },
  {
    number: "02",
    title: "Seleção personalizada",
    text: "Não mando lista genérica. Você recebe uma curadoria curta, com os imóveis certos para o momento.",
  },
  {
    number: "03",
    title: "Visitas acompanhadas",
    text: "Eu vou junto. Mostro o que o anúncio não mostra: vizinhança, incidência de sol, documentação e ressalvas.",
  },
  {
    number: "04",
    title: "Suporte até a assinatura",
    text: "Negociação, banco, cartório e entrega das chaves. Você não fica sozinho no meio do caminho.",
  },
];

export const testimonials = [
  {
    quote:
      "O Rafael não empurrou imóvel. Ele perguntou como a gente vivia e só então mostrou três opções. Fechamos a casa certa.",
    name: "Fernanda M.",
    place: "Jardim Primavera",
  },
  {
    quote:
      "Achei que ia receber 40 links no WhatsApp. Recebi uma seleção objetiva, com prós e contras de cada um. Profissional de verdade.",
    name: "Ricardo A.",
    place: "Parque das Flores",
  },
  {
    quote:
      "Visitamos juntos, ele leu a matrícula com a gente e acompanhou até o cartório. Sem pressa, sem pressão.",
    name: "Camila S.",
    place: "Residencial Eldorado",
  },
];

export const neighborhoods = [
  { name: "Jardim Primavera", note: "Casas amplas e rua arborizada" },
  { name: "Parque das Flores", note: "Alto padrão e fácil acesso" },
  { name: "Residencial Eldorado", note: "Famílias e sobrados novos" },
  { name: "Village Garden", note: "Condomínio com lazer completo" },
  { name: "Condomínio Orquídeas", note: "Privacidade e área verde" },
  { name: "Centro", note: "Lofts e praticidade urbana" },
  { name: "Rio Quente", note: "Resorts e águas termais" },
  { name: "Marzagão", note: "Entorno e tranquilidade" },
];
