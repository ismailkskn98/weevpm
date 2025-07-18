import React from 'react'
import { getMessages, getTranslations } from 'next-intl/server'

export default async function LegalPage({ params, searchParams }) {
    const { slug } = await params;
    const queryParams = await searchParams;

    const pathToContentMapping = {
        'privacy-policy': 'privacyPolicy',
        'distance-sales-agreement': 'distanceSalesAgreement',
        'delivery-and-return-terms': 'deliveryReturnTerms',
        'delete-account': 'deleteAccount'
    };

    const contentKey = queryParams.t || pathToContentMapping[slug];
    const messages = await getMessages();
    const content = messages.Legal[contentKey];
    const t = await getTranslations('Legal.page');

    if (!content) {
        return (
            <div className="flex items-center justify-center min-h-64 px-4">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">{t('notFound')}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{t('notFoundDescription')}</p>
                </div>
            </div>
        )
    }

    const articles = Object.entries(content)
        .filter(([key]) => key.startsWith('article'))
        .sort(([a], [b]) => a.localeCompare(b));

    return (
        <article className="prose prose-sm sm:prose-base max-w-none px-4 sm:px-6 lg:px-8">
            <header className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    {content.title}
                </h1>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-teal to-aqua-green rounded-full mb-4 sm:mb-6"></div>
            </header>

            {(content.subtitle || content.subdescription || content.description) && (
                <section className="mb-8 sm:mb-10 p-4 sm:p-6 bg-gray-50/50 rounded-xl border border-gray-100">
                    {content.subtitle && (
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                            {content.subtitle}
                        </h2>
                    )}
                    {content.subdescription && (
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                            {content.subdescription}
                        </p>
                    )}
                    {content.description && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {content.description}
                        </p>
                    )}
                </section>
            )}

            <div className="space-y-6 sm:space-y-8">
                {articles.map(([key, article], index) => (
                    <section key={key} className="relative">
                        <div className="flex items-start gap-3 sm:gap-4 mb-0">
                            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-teal text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 break-words">
                                    {article.title}
                                </h2>
                            </div>
                        </div>

                        {article.description && (
                            <div className="ml-10 sm:ml-12 mb-3 sm:mb-4">
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                                    {article.description}
                                </p>
                            </div>
                        )}

                        <div className="ml-10 sm:ml-12">
                            {Object.entries(article)
                                .filter(([k]) => k.startsWith('item'))
                                .sort(([a], [b]) => a.localeCompare(b))
                                .map(([itemKey, itemValue]) => (
                                    <div key={itemKey} className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3 group">
                                        <div className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-mint rounded-full mt-2 sm:mt-2.5 transition-colors group-hover:bg-teal"></div>
                                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words min-w-0">{itemValue}</p>
                                    </div>
                                ))}
                        </div>

                        {index < articles.length - 1 && (
                            <div className="mt-6 sm:mt-8 border-b border-gray-100"></div>
                        )}
                    </section>
                ))}
            </div>
        </article>
    )
}
