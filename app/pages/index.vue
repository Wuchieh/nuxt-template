<template>
    <div>
        <div>
            <NuxtLinkLocale :to="{ name: 'page' }">
                to page
            </NuxtLinkLocale>
        </div>
        <div>
            <div class="color-red i-icon-cat size-10" />
        </div>
        <div class="flex items-center gap-2">
            <SwitchLocalePathLink
                v-for="v in locales"
                :key="v.code"
                :locale="v.code"
            >
                <button class="bg-emerald color-white h-40px cursor-pointer rounded border-none p-2">
                    {{ v.name }}
                </button>
            </SwitchLocalePathLink>
        </div>
        <div>
            <span>
                {{ $t('lang') }}
            </span>
        </div>
        <div>
            <div>
                <v-btn
                    class="add-count-btn"
                    @click="app.count++"
                >
                    Add Count
                </v-btn>
            </div>
            <div>
                count:{{ app.count }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { locales } = useI18n();
const app = useAppStore();
definePageMeta({ name: 'index' });
</script>

<style scoped lang="scss">
.add-count-btn{
    @apply bg-blue-6 color-white h-40px cursor-pointer rounded border-none p-2
}
</style>
