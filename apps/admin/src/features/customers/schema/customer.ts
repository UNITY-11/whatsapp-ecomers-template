import { defineField, defineType} from"sanity";

export const customer = defineType({
 name:"customer",
 title:"Customer",
 type:"document",
 fields: [
 defineField({ name:"name", title:"Name", type:"string", validation: (r) => r.required()}),
 defineField({ name:"phone", title:"Phone", type:"string", validation: (r) => r.required()}),
 defineField({ name:"email", title:"Email", type:"string"}),
 defineField({
 name:"addresses",
 title:"Addresses",
 type:"array",
 of: [{
 type:"object",
 fields: [
 { name:"label", type:"string"},
 { name:"street", type:"string"},
 { name:"city", type:"string"},
 { name:"state", type:"string"},
 { name:"zip", type:"string"},
 { name:"country", type:"string"},
 { name:"isDefault", type:"boolean"},
 ],
}],
}),
 ],
 preview: { select: { title:"name", subtitle:"phone"}},
});
