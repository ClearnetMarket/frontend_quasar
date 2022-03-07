<template>

    <h3 class="mb-2 mt-6 text-lg font-medium">{{ label }}</h3>

    <div class="grid grid-cols-3 gap-5">

        <label class="col-span-2 block text-sm font-medium text-gray-700">

            title

            <input class="block mt-1 w-full text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"

                   type="text"

                   @input="$emit('update:title', $event.target.value)"

                   :value="title"

                   placeholder="title"/>

        </label>

 

        <label class="block text-sm font-medium text-gray-700">

            Number

            <input class="block mt-1 w-full text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"

                   type="text"

                   @input="$emit('update:streetNumber', $event.target.value)"

                   :value="streetNumber"

                   placeholder="Number"/>

        </label>

 

        <label class="block text-sm font-medium text-gray-700">

            Postcode

            <input class="block mt-1 w-full text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"

                   type="text"

                   @input="$emit('update:postcode', $event.target.value)"

                   :value="postcode"

                   placeholder="Postcode"/>

        </label>

 

        <label class="block text-sm font-medium text-gray-700">

            City

            <input class="block mt-1 w-full text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"

                   type="text"

                   @input="$emit('update:city', $event.target.value)"

                   :value="city"

                   placeholder="City"/>

        </label>

    </div>

</template>

 

<script>

export default {

    props: {

        label: {

            type: String,

            default: '',

        },

        street: {

            type: String,

            default: '',

        },

        streetNumber: {

            type: String,

            default: '',

        },

        postcode: {

            type: String,

            default: '',

        },

        city: {

            type: String,

            default: '',

        },

    },

};

</script>